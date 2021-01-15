
module.exports  = function getItemTypeTemplate(i_ResourceName, i_ItemJsdocDescription){
    return`
    /**
     * @typedef {${i_ItemJsdocDescription}} ${i_ResourceName}
     */`
}