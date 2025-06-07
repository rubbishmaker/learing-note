import React, { useEffect,useState } from "react";
import axios from "axios";

export default ()=>{
    const [data,setData] = useState<any>(null);

    useEffect(()=>{
     axios.get('localhost:8777/getData')?.then((res)=>{
        setData(res.data);
     }).catch((err)=>{
        console.error('请求失败', err);
     })
    },[])
    return <>
    <div>我是测试请求的组件</div>
    <div>{data?.msg}</div>
    </>
}