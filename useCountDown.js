import { useEffect, useState } from "react"


function getCountdown(diff) {
    
    if(typeof diff !== 'number'){return Error('非数字')}
    if (diff <= 0) return "已过期";
  
    // 计算天、小时、分钟、秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff   % (1000 * 60 * 60)/ (1000 * 60)));
    const seconds = Math.floor((diff  % (1000 * 60)) / 1000);
  
    // 格式化为 "X天 HH:MM:SS"
    return `${days}天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
export default function (timeStamp){

    const [current,setCurrentTime] = useState(()=>{
        return timeStamp ? getCountdown( timeStamp - Date.now()) : "--"
    })


    useEffect(()=>{
      if(!timeStamp){return}
      //这里做一个帧计算
      if(typeof requestAnimationFrame === 'function'){
        let requestId = null;
        let startTime = performance.now()
        const timeDown =  timeStamp - Date.now();
        if(timeDown <0){cancelAnimationFrame(requestId);return}
        const fn = (time)=>{
           //取消函数
          if(time - startTime > timeDown){
            cancelAnimationFrame(requestId)
            setCurrentTime("00:00:00")
            return
          }
          const currentTime = timeDown - (time - startTime)
          setCurrentTime(getCountdown(currentTime))
          requestId =  requestAnimationFrame(fn)
        }
        requestId =  requestAnimationFrame(fn)
      }else {
       let timer =  setInterval(()=>{
            if(timeStamp - Date.now() <= 0){
                clearInterval(timer)
                setCurrentTime("00:00:00")
            }else{
                //  updateRef.current
                setCurrentTime(getCountdown(timeStamp - Date.now()))
            }
           
        },1000)
      }
    },[timeStamp])

    return {
        time:current,
    }
}