// Forked from https://github.com/microsoft/HealthBotCodeSnippets

const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const fs = require("fs");

if (process.argv.length !== 5) {
    console.log("Usage: node healthAgentAPI.js <post_scenarios|get_scenarios|get_localization> <tenantName> <API_JWT_secret>");
    process.exit();
}
const action = process.argv[2];
const tenantName = process.argv[3]
const jwtSecret = process.argv[4];

const BASE_URL = "https://eastus.healthbot.microsoft.com/";
const jwtToken = jwt.sign({
    tenantName: tenantName,
    iat: Math.floor(Date.now()  / 1000) - 10
  }, jwtSecret);

console.log(jwtToken);

if (action === "post_scenarios") {
    const options = {
        method: 'POST',
        uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: [
            {
                "name":"Hello World",
                "scenario_trigger":"hello_world",
                "description":"",
                "code":"{\n  \"version\": 2,\n  \"steps\": [\n    {\n      \"id\": \"aaa3073dc553-32a44525cced8e2f-2200\",\n      \"type\": \"statement\",\n      \"designer\": {\n        \"xLocation\": 479,\n        \"yLocation\": 196\n      },\n      \"text\": \"Hello World!\"\n    }\n  ]\n}"
            },
            {
                "name":"Greetings",
                "scenario_trigger":"greetings",
                "description":"",
                "code":"{\n  \"version\": 2,\n  \"steps\": [\n    {\n      \"id\": \"aaa3073dc553-32a44525cced8e2f-2200\",\n      \"type\": \"statement\",\n      \"designer\": {\n        \"xLocation\": 479,\n        \"yLocation\": 196\n      },\n      \"text\": \"Greetings!\"\n    }\n  ]\n}"
            }
        ],
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

if (action === "get_scenarios") {
    const options = {
        method: 'GET',
        uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    };

    rp(options)
        .then(function (parsedBody) {
            var result = JSON.parse(parsedBody);

            fs.writeFileSync("template.json", JSON.stringify(result, null, 4));

            result.forEach(function(scenario) { 
                scenario.code = JSON.parse(scenario.code);               
                fs.writeFileSync(`scenarios/${scenario.scenario_trigger}.json`, JSON.stringify(scenario, null, 4));                
            }); 
        })
        .catch(function (err) {
            console.log(jwtToken);
            console.log(err.message);
        });
}

if (action === "get_localization") {
    const options = {
        method: 'GET',
        uri: `${BASE_URL}api/account/${tenantName}/localization`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(jwtToken);
            console.log(err.message);
        });
}
