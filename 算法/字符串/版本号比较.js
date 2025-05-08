function version(v1,v2){
  if(typeof v1 !== 'string' || typeof v2 !=='string'){
    throw new Error("")
  }

  const v1list = v1.split(".")
  const v2list = v2.split(".")

  let max  = Math.max(v1list.length,v2list.length)

  for(let i = 0;i<max;i++){
    if(v1list[i] && !v2list[i]){
        return v1
    }
    if(!v1list[i] && v2list[i]){
        return v2
    }

    if(Number(v1list[i])>Number(v2list[i])){
        return v1
    }
    if(Number(v1list[i])<Number(v2list[i])){
        return v2
    }

    
  }
}

console.log(version("2.4.5.1","2.4.5"));
