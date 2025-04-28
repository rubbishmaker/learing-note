import React,{useEffect,RefObject} from "react"

export default (ref:RefObject<HTMLElement>)=>{
    const [size,setSize] = useState(()=>{
        const el = ref.current;
        return el ? { width: el.clientWidth, height: el.clientHeight } : undefined
    })


    useEffect(()=>{
      if(!ref.current){return }

      const observer = new ResizeObserver((entries)=>{
        for(let entry of entries){
            const { clientWidth, clientHeight } = entry.target;
            setSize({ width: clientWidth, height: clientHeight });
        }
    })
    observer.observe(ref.current);

    return ()=>{
        observer?.disconnect() 
    }
    },[])
    return [size]
}