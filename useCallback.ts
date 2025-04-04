import React, { useRef } from "react"

export default (fn,dependenices)=>{

    const fnRef = useRef(fn);
    const dependenicesRef = useRef(dependenices);



    //三个判断条件
    const hasChanged =!dependenicesRef.current
    ||dependenicesRef.current.length !== dependenices.length
     ||dependenices?.some((item,index)=>{
       return Object.is(dependenicesRef.current[index],item)
    })



    if(hasChanged){
        dependenicesRef.current = dependenices
        fnRef.current = fn
    }
   

    return fnRef.current
}