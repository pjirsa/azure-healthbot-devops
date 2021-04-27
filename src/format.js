const fs = require("fs");

if (process.argv.length !== 4) {
    console.log("Usage: node format.js <prep-import|parse-export> <foldername>");
    process.exit();
}
const action = process.argv[2];
const foldername = process.argv[3];

if (action === 'prep-import') {
    var files = fs.readdirSync(foldername);

    files.forEach(function(file) {
        console.log(file);
        var filepath = `${foldername}/${file}`;
        var contents = fs.readFileSync(filepath);
        var scenario = JSON.parse(contents);

        try {
            // if parse fails, it is already parsed and should be stringified
            JSON.parse(scenario.code);
        } catch {
            scenario.code = JSON.stringify(scenario.code);
        }

        fs.writeFileSync(filepath, JSON.stringify(scenario, null, 4));
    })
}