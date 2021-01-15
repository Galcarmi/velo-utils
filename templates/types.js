module.exports  = function getTypesTemplate(){
    return`
/**
 * @typedef {{_id:String,_createdDate:Date, _updatedDate:Date, _owner:String}} CorvidItemTrace
 */

/**
 * @typedef {{isCalledFromInsideClass:Boolean}} InitializationDetails
 */`
}