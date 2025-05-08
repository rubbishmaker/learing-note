function mergeList(arr1,arr2){
   const result = []
   const len = arr1.length + arr2.length
   for(let i = len-1;i>=0;i--){
    if(arr1.length === 0){
        result[i] = arr2.pop();
        continue
    }
    if(arr2.length === 0){
        result[i] = arr1.pop()
        continue
    }
    const arr1last = arr1.pop()
    const arr2last = arr2.pop()
    const max = Math.max(arr1last,arr2last)
    if(arr1last>arr2last){
        arr2.push(arr2last) 
    }else{
        arr1.push(arr1last) 
    }

    result[i] = max
   }
   return result
}

const result  = mergeList([1,3,4,7,8],[2,5,9,11])
console.log(result,"---");
