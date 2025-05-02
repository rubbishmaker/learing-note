function deepClone(obj,map = new WeakMap()){
  if(typeof obj !== 'object' ||  obj === undefined || obj===null){
    return obj
  }
  if(obj instanceof Date){
    return new Date(obj)
  }

  if(obj instanceof RegExp){
    return new Date(obj)
  }

  if(map.has(obj)){
    return map.get(obj)
  }

  const cloneobj = Array.isArray(obj) ? [] :{}

  map.set(obj,cloneobj);

  for(let key in obj){
    if(obj.hasOwnProperty(key)){
        cloneobj[key] = deepClone(obj[key],map)
    }
  }

  return cloneobj
}
