console.log('connected');


// npm uninstall -g .

const fs = require('fs');

fs.writeFile("./test.js", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

// Or
fs.writeFileSync('/tmp/test-sync', 'Hey there!');