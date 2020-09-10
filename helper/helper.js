/**
 * changeFormatToJSON: This function is used to convert flat csv data into JSON object in hierarchical structure.
 * @param { String } data - CSV data.
 * @param { String } root - Root entity identifier. 
 */
function changeFormatToJSON(data, root) {
    const content = data.split('\r\n');
    const header = content[0].split(',');
    const dataArray = [];
    let copyObj = {};
    // Converting csv rows into array of JSON objects.
    content.forEach(conVal => {
        let tempObj = {};
        let valuesArray = conVal.split(',');
        valuesArray.forEach((val, index) => {
            tempObj[header[index]] = valuesArray[index]
        });
        dataArray.push(tempObj);
    });
    // Converting individual row objects into hierarchical structure.
    dataArray.forEach(obj => {
        Object.assign(copyObj[obj.entity] = copyObj[obj.entity] || {}, obj);
        copyObj[obj.parent] = copyObj[obj.parent] || {};
        copyObj[obj.parent].children = copyObj[obj.parent].children || [];
        copyObj[obj.parent].children.push(copyObj[obj.entity]);
    });
    return copyObj[root].children;
};

/**
 * calcCombinedUtil - Calculate the combined utilisation at each entity.
 * @param { Array } entityList -  Formated hierarchical JSON.
 */

async function calcCombinedUtil(entityList) {  
    let creditBreach = {};
    let curIndex = 0;
    const sumEntityUtilisation = (childEntity, ind) => {
        // Capture entity entries under each tree.
        if (ind != undefined) {
            curIndex = ind;
            creditBreach[curIndex] = { entity: childEntity.entity };
        } else {
            creditBreach[curIndex].entity += '/' + childEntity.entity;
        }

        // Iterate through child level entities, if any.
        let sum = 0;
        if (childEntity.children) childEntity.children.forEach((childEntity, index) => {
            sum += sumEntityUtilisation(childEntity);
        });

        childEntity.combinedUtilisation = sum + parseInt(childEntity.utilisation);

        // capturing combined utilisation breach at each entity. 
        if (childEntity.limit < childEntity.combinedUtilisation) {
            creditBreach[curIndex].breach = creditBreach[curIndex].breach || [];
            creditBreach[curIndex].breach.push(childEntity);
        }
        return childEntity.utilisation === undefined ? sum : parseInt(childEntity.combinedUtilisation);
    }
    // Iterator for parent level entities.
    entityList.forEach((entity, index) => {
        sumEntityUtilisation(entity, index);
    });
    return await creditBreach;
}

/**
 * logCreditBreach - This function prints credit breaches at at each entity level.
 * @param { Object } creditBreach - Captured credit breaches at each entiry and combined sub-entity limits. 
 */
function logCreditBreach(creditBreach) {
    let output = '';
    for( key in creditBreach ) {
        output += `Entities: ${creditBreach[key].entity}: </br>`;
        const breachArr = creditBreach[key].breach;
        if (breachArr && breachArr.length) {
            breachArr.map(breach => {
                output += `&nbsp; Limit breach at ${breach.entity} ( limit = ${breach.limit}, direct utilisation = ${breach.utilisation}, combined utilisation = ${breach.combinedUtilisation}).</br>`;
            });
        } else {
            output += '&nbsp; No limit breaches </br>';
        }
    }
    return output;
}


module.exports = {
    changeFormatToJSON,
    calcCombinedUtil,
    logCreditBreach
};