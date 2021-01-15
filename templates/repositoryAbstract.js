
module.exports  = function getAbstractRepository(){
    return`
    /**
     * Generic Resource Repository.
     * @class
     * @template T CorvidItemTrace
     */
    export class Repository {
        /**
         * finds item by id
         * @abstract
         * @param {String} id
         * @return {Promise<(T & CorvidItemTrace) | null>}
         */
        async FindById_a(id) {
            throw new Error('must be implemented by subclass!');
        }
    
        /**
         * delets item by id
         * @abstract
         * @param {String} id
         * @return {Promise<(T & CorvidItemTrace) | null>}
         */
        async DeleteById_a(id) {
            throw new Error('must be implemented by subclass!');
        }
    
        /**
         * update item
         * @abstract
         * @param {T} item
         * @return {Promise<(T & CorvidItemTrace) | null>}
         */
        async UpdateItem_a(item){
            throw new Error('must be implemented by subclass!');
        }
    
        /**
         * update item
         * @abstract
         * @param {T} item
         * @return {Promise<(T & CorvidItemTrace) | null>}
         */
        async Insert_a(item){
            throw new Error('must be implemented by subclass!');
        }
        
    }`
}