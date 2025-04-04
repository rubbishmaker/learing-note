import React,{useState} from "react"

export type Element = (state:boolean)=> React.ReactElement | React.ReactElement
export default (element:Element):[React.ReactElement,boolean] =>{

    const [state,setState] = useState(false)

    const onMouseEvent = (originalOnMouseLeave?:any)=>{
        return (event)=>{
            originalOnMouseLeave?.(event);
            setState(true)
        }
    }
    const onMouseLeave = (originalOnMouseLeave?:any)=>{
        return (event)=>{
            originalOnMouseLeave?.(event);
            setState(false)
        }
    }


    if(typeof element ==='function'){
        element = element(state)
    }
    const el = React.cloneElement(element,{
        onMouseEvent:onMouseEvent(element.props.onMouseEvent),
        onMouseLeave:onMouseLeave(element.props.onMouseLeave)
    })
    return [el,state]
}

