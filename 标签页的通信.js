/**
 * 可以new一个 BroadcastChannel
 * const ob = new BroadcastChannel()
 * 
 * 和直接使用postMessage的区别
 * postMessage可以监听不同域下的任何消息
 * BroadcastChannel是同一域
 */
const ob = new BroadcastChannel("sync")

const sendMsg  = (type,msg)=>{
    ob.postMessage({type,msg})
}

const listenMsg = (callbacks)=>{
    ob.addEventListener('message',({data})=>{
        callbacks(data)
    }) 
}