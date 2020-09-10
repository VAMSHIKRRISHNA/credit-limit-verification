##### Project Title

credit-limit-verification (Validate Credit Limit Hierarchies)

## Requirements

You will only need Node.js installed in your environement.

##### Install dependencies

mocha npm module 

##### Start

`
npm install
node server => Listening server on http://127.0.0.1:8000/

`
## npm scripts
"test": "mocha **/*.test.js", // Runs all the test cases
"start": "node server.js" // Runs the application

## Configure app

Open `data/data.csv` then edit it with your settings. You will need:
- entity;
- parent;
- limit;
- utilisation;

## SAmple Output

credit-limit-verification>node server
Entities: A/B/C/D:

 No limit breaches

Entities: E/F:

 Limit breach at E ( limit = 200, direct utilisation = 150, combined utilisation = 230).