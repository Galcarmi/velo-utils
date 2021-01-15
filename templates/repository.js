module.exports  = function getItemRepositoryTemplate(i_CollectionName, i_ResourceName){
    return`
    
import wixData from 'wix-data';
import { Repository } from '../velo-utils-types/Repository.js';

const authOptions = {
    "suppressAuth": true
}

/**
 * ${i_ResourceName}Repository
 * @constructor
 * @augments Repository<${i_ResourceName}>
 */
export class ${i_ResourceName}Repository extends Repository {

    static s_Instance;
    /**
     * @param {InitializationDetails} initializationDetails
     */
    constructor(initializationDetails) {
        if (initializationDetails.isCalledFromInsideClass) {
            super();
            /**@private */
            this.m_CollectionName = '${i_CollectionName}';
        } else {
            throw Error('please use GetInstance Method')
        }       
    }

    /**
     * @description singleton method
     * @returns {${i_ResourceName}Repository}
     */
    static GetInstance(){
        if(!this.s_Instance){
            ${i_ResourceName}Repository.s_Instance = new ${i_ResourceName}Repository({isCalledFromInsideClass:true});
        }

        return ${i_ResourceName}Repository.s_Instance;
    }

    /**
     * @description finds item by id
     * @param i_Id {String}
     * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
     */
    async FindById_a(i_Id) {
        const res = await wixData.query(this.m_CollectionName).eq('_id',i_Id).find(authOptions);

        /**@type ${i_ResourceName} & CorvidItemTrace */
        const item = res.items[0];

        return item;
    }  

    /**
     * @description update item
     * @param i_Item {${i_ResourceName}}
     * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
     */
    async UpdateItem_a(i_Item) {
        /**@type CorvidItemTrace & ${i_ResourceName} */
        const updated${i_ResourceName} = await wixData.update(this.m_CollectionName, i_Item, authOptions);

        return updated${i_ResourceName};
    }

    /**
     * @description deletes item by id
     * @param i_Id {String}
     * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
     */
    async DeleteById_a(i_Id){
        const item = await wixData.remove(this.m_CollectionName, i_Id, authOptions);

        return item;
    }

    /**
     * @description insert item
     * @param i_Item {${i_ResourceName}}
     * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
     */
    async Insert_a(i_Item){
        const insertedItem = await wixData.insert(this.m_CollectionName, i_Item, authOptions);

        return insertedItem;
    }

    /**
     * @description find all items (500) in db 
     * @returns {Promise<Array<CorvidItemTrace & ${i_ResourceName}>>}
     */
    async FindAll() {

        const itemsQuery = await wixData.query(this.m_CollectionName).limit(500).find(authOptions);
        /**@type Array<CorvidItemTrace & System> */
        const allItems = itemsQuery.items;

        return allItems;
    }
}`
}