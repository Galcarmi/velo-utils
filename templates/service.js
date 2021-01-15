module.exports  = function getServiceTemplate(i_ResourceName){
    return`

    import { SystemRepository } from './${i_ResourceName}Repository.js';


    export class ${i_ResourceName}Service{
        static s_Instance;
        /**
         * @param {InitializationDetails} initializationDetails
         */
        constructor(initializationDetails) {
            if (initializationDetails.isCalledFromInsideClass) {
                this.m_${i_ResourceName}Repository = ${i_ResourceName}Repository.GetInstance();
            } else {
                throw Error('please use GetInstance Method')
            }       
        }
         /**
          * @description singleton function
          * @returns {${i_ResourceName}Service}
          */
        static GetInstance(){
            if(!this.s_Instance){
                ${i_ResourceName}Service.s_Instance = new ${i_ResourceName}Service({isCalledFromInsideClass:true});
            }
    
            return ${i_ResourceName}Service.s_Instance;
        }
    
        /**
         * @description finds all items in db (500)
         * @returns {Promise<Array<CorvidItemTrace & ${i_ResourceName}>>}
         */
        async GetAllItems(){
            const res = await this.m_${i_ResourceName}Repository.FindAll();
    
            return res;
        }
    
        /**
         * @description finds item by id
         * @param i_Id {String}
         * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
         */
        async GetById(i_Id){
            const res= await this.m_${i_ResourceName}Repository.FindById_a(i_Id);
    
            return res;
        }
    
        /**
         * @description update item
         * @param i_${i_ResourceName} {CorvidItemTrace & ${i_ResourceName}}
         * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
         */
        async Update${i_ResourceName}(i_${i_ResourceName}){
            const res = await this.m_${i_ResourceName}Repository.UpdateItem_a(i_${i_ResourceName});
    
            return res;
        }
    
        /**
         * @description delets item by id
         * @param i_Id {String}
         * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
         */
        async Delete${i_ResourceName}ById(i_Id){
            const res= await this.m_${i_ResourceName}Repository.DeleteById_a(i_Id);
    
            return res;
        }
    
        /**
         * @description insert item
         * @param i_${i_ResourceName} {CorvidItemTrace & ${i_ResourceName}}
         * @returns {Promise<CorvidItemTrace & ${i_ResourceName}>}
         */
        async Insert${i_ResourceName}(i_${i_ResourceName}){
            const res= await this.m_${i_ResourceName}Repository.Insert_a(i_${i_ResourceName});
    
            return res;
        }
    }`
}