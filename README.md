

# velo-utils
velo-utils reduces a lot of redundant development time by giving you velo-cli.
velo cli gives you the ability to create velo files/folders while working on a best practice architecture


Example:


```
user runs the command "velo-init"
package logs to the user: "enter resource name"
user enters: "system"
package logs to the user: enter collection name
user enters: "__system"
package logs to the user: enter resource data jsdoc object
user enters: "{name:String}"
```


```js
  //package creates --->>>
  //  /velo-utils-types
  //  	/Repository.js
  //  	/types.d.js
  //  /src
  //  	/backend
  //    	/system
  // 		   	/system.d.js
  // 		   	/systemRepository.js
  // 		   	/systemService.js
  // 		   	/systemWM.jsw
  
	  

//Repository.js=>

/**
* Generic Resource Repository.
* @class
* @template  T CorvidItemTrace
*/

export  class  Repository {

/**

* finds item by id
* @abstract
* @param  {String}  id
* @return  {Promise<(T & CorvidItemTrace) | null>}
*/

async  FindById_a(id) {
throw  new  Error('must be implemented by subclass!');

}

/**

* delets item by id
* @abstract
* @param  {String}  id
* @return  {Promise<(T & CorvidItemTrace) | null>}
*/

async  DeleteById_a(id) {
throw  new  Error('must be implemented by subclass!');
}

/**

* update item
* @abstract
* @param  {T}  item
* @return  {Promise<(T & CorvidItemTrace) | null>}
*/

async  UpdateItem_a(item){

throw  new  Error('must be implemented by subclass!');

}

/**
* update item
* @abstract
* @param  {T}  item
* @return  {Promise<(T & CorvidItemTrace) | null>}
*/

async  Insert_a(item){

throw  new  Error('must be implemented by subclass!');

}

}

//types.d.js =>
  

/**
* @typedef  {{_id:String,_createdDate:Date, _updatedDate:Date, _owner:String}}  CorvidItemTrace
*/

  

/**
* @typedef  {{isCalledFromInsideClass:Boolean}}  InitializationDetails
*/

//system.d.js=>
  
/**
* @typedef  {{name:String}}  System
*/


//SystemRepository.js =>
  
import  wixData  from  'wix-data';
import { Repository } from  '../velo-utils-types/Repository.js';
  
const  authOptions = {
"suppressAuth":  true
}

/**
* SystemRepository
* @constructor
* @augments  Repository<System>
*/
export  class  SystemRepository  extends  Repository {
 
static  s_Instance;
/**
* @param  {InitializationDetails}  initializationDetails
*/
constructor(initializationDetails) {
if (initializationDetails.isCalledFromInsideClass) {
super();
/**@private */
this.m_CollectionName = '__system';
} else {
throw  Error('please use GetInstance Method')
}
}
  
/**
* @description singleton method
* @returns  {SystemRepository}
*/
static  GetInstance(){
if(!this.s_Instance){
SystemRepository.s_Instance = new  SystemRepository({isCalledFromInsideClass:true});
}
  
return  SystemRepository.s_Instance;
}
  
/**
* @description finds item by id
* @param  i_Id {String}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  FindById_a(i_Id) {
const  res = await  wixData.query(this.m_CollectionName).eq('_id',i_Id).find(authOptions);
  
/**@type System & CorvidItemTrace */
const  item = res.items[0];
  
return  item;
}
  
/**
* @description update item
* @param  i_Item {System}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  UpdateItem_a(i_Item) {
/**@type CorvidItemTrace & System */
const  updatedSystem = await  wixData.update(this.m_CollectionName, i_Item, authOptions);
  
return  updatedSystem;
}
  
/**
* @description deletes item by id
* @param  i_Id {String}
* @returns  {Promise<CorvidItemTrace & System>}
*/

async  DeleteById_a(i_Id){
const  item = await  wixData.remove(this.m_CollectionName, i_Id, authOptions);

return  item;
}
  
/**
* @description insert item
* @param  i_Item {System}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  Insert_a(i_Item){
const  insertedItem = await  wixData.insert(this.m_CollectionName, i_Item, authOptions);

return  insertedItem;
}
  
/**
* @description find all items (500) in db
* @returns  {Promise<Array<CorvidItemTrace & System>>}
*/

async  FindAll() {
const  itemsQuery = await  wixData.query(this.m_CollectionName).limit(500).find(authOptions);
/**@type Array<CorvidItemTrace & System> */
const  allItems = itemsQuery.items;

return  allItems;
}
}

//systemService =>

import { SystemRepository } from  './SystemRepository.js';
  
export  class  SystemService{
static  s_Instance;
/**
* @param  {InitializationDetails}  initializationDetails
*/
constructor(initializationDetails) {
if (initializationDetails.isCalledFromInsideClass) {
this.m_SystemRepository = SystemRepository.GetInstance();
} else {
throw  Error('please use GetInstance Method')
}
}
/**
* @description singleton function
* @returns  {SystemService}
*/
static  GetInstance(){
if(!this.s_Instance){
SystemService.s_Instance = new  SystemService({isCalledFromInsideClass:true});
}

return  SystemService.s_Instance;
}
/**
* @description finds all items in db (500)
* @returns  {Promise<Array<CorvidItemTrace & System>>}
*/
async  GetAllItems(){
const  res = await  this.m_SystemRepository.FindAll();

return  res;
}
/**
* @description finds item by id
* @param  i_Id {String}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  GetById(i_Id){
const  res= await  this.m_SystemRepository.FindById_a(i_Id);

return  res;
}
/**
* @description update item
* @param  i_System {CorvidItemTrace & System}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  UpdateSystem(i_System){
const  res = await  this.m_SystemRepository.UpdateItem_a(i_System);

return  res;
}
/**
* @description delets item by id
* @param  i_Id {String}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  DeleteSystemById(i_Id){
const  res= await  this.m_SystemRepository.DeleteById_a(i_Id);

return  res;
}
/**
* @description insert item
* @param  i_System {CorvidItemTrace & System}
* @returns  {Promise<CorvidItemTrace & System>}
*/
async  InsertSystem(i_System){
const  res= await  this.m_SystemRepository.Insert_a(i_System);

return  res;
}
}

//systemWM.jsw =>
import {SystemService} from  './SystemService'

```

