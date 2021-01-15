#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

function writeFile(i_Route,i_FileName, i_Content){
    fs.writeFile(`${i_Route}${i_FileName}.js`, i_Content, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

function createFolderIfDoesntExists(i_FolderName){
    !fs.existsSync(`./${i_FolderName}/`) && fs.mkdirSync(`./${i_FolderName}/`, { recursive: true });
}


async function executeFunction(){
    const resourceName = await askQuestion("enter resource name");
    const resourceData = await askQuestion("enter resource data object");
    createFolderIfDoesntExists('./src');
    createFolderIfDoesntExists('./src/backend');
    createFolderIfDoesntExists(`./src/backend/${resourceName}`);
    writeFile(`./src/backend/${resourceName}/`,`${resourceName}Respository`,'console.log(ok)');
    writeFile(`./src/backend/${resourceName}/`,`${resourceName}Service`,'console.log(ok)');
    writeFile(`./src/backend/${resourceName}/`,`${resourceName}Controller`,'console.log(ok)');
}

executeFunction()