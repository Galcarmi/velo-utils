#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const getTypesTemplate = require('../templates/types')
const getAbstractRepository = require ('../templates/repositoryAbstract');
const getServiceTemplate = require ('../templates/service');
const getItemRepositoryTemplate = require ('../templates/repository');
const getItemTypeTemplate = require ('../templates/itemType');
const {capitalize} = require('../utils/stringUtils');


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
    fs.writeFile(`${i_Route}${i_FileName}`, i_Content, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
}

function createFolderIfDoesntExists(i_FolderName){
    !fs.existsSync(`./${i_FolderName}/`) && fs.mkdirSync(`./${i_FolderName}/`, { recursive: true });
}


async function executeFunction(){
    const resourceName = await askQuestion("enter resource name ");
    const collectionName = await askQuestion("enter collection name ");
    const resourceData = await askQuestion("enter resource data jsdoc object ");
    const prettierResourceName = capitalize(resourceName);

    createFolderIfDoesntExists('./src');
    createFolderIfDoesntExists('./src/backend');
    createFolderIfDoesntExists(`./src/backend/${resourceName}`);
    createFolderIfDoesntExists(`./src/backend/velo-utils-types`);

    writeFile(`./src/backend/${resourceName}/`,`${prettierResourceName}Respository.js`,getItemRepositoryTemplate(collectionName, prettierResourceName));
    writeFile(`./src/backend/${resourceName}/`,`${prettierResourceName}Service.js`,getServiceTemplate(prettierResourceName));
    writeFile(`./src/backend/${resourceName}/`,`${resourceName}.d.js`,getItemTypeTemplate(prettierResourceName, resourceData));
    writeFile(`./src/backend/velo-utils-types/`,`types.d.js`,getTypesTemplate());
    writeFile(`./src/backend/velo-utils-types/`,`Repository.js`,getAbstractRepository());
}

executeFunction()