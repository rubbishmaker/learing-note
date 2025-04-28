class EventBus {
    #event = {}

    $on(eventName,callback){
        if(this.#event?.[eventName]?.length){
            this.#event?.[eventName]?.push(callback)
        }else{
            this.#event[eventName]  = [callback]
        }
    }


    $emit(eventName){
      if(this.#event?.[eventName]?.length){
        this.#event?.[eventName]?.forEach(cb=>{
            cb?.()
        })
      }
    }



    $off(eventName,callback){
      //先判断有没有callbak
      if(!callback){
        this.#event[eventName] = []
      }else{
        this.#event[eventName] = this.#event[eventName].filter((item)=>item !== callback )
      }
    }


    $once(eventName,callback){
       const cb = (...args)=>{
        callback?.apply(null,...args)
        this.$off(eventName,cb)
       }

       this.$on(eventName,cb)
    }
}