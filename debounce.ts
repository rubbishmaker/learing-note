const debounce = <T extends any[]>(func:(...args:T)=>(void),{delay})=>{

    /** 这一个类型不太理解 */
    let timer : NodeJS.Timeout | undefined = undefined;
    let active = true 

    const debounced = (...args :T) =>{
      if(active){
       clearTimeout(timer)
       timer = setTimeout(()=>{
        active && func(...args)
        timer = undefined
       },delay)

      }  else{
        func(...args)
      }
    }

    debounced.isPending  = ()=>{
        return timer  !== undefined
    }

    debounced.cancel = ()=>{
        active = false
    }

    debounced.flush = (...args:T)=>{
        func(...args)
    }
    return debounced


}