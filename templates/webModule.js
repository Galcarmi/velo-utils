module.exports  = function getWebModuleTemplate(i_ResourceName){
    return`
import {${i_ResourceName}Service} from './${i_ResourceName}Service'`
}