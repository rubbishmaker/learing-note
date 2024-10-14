/**一个requestAnimationFrame的实际应用
 * 金额的动画效果
 * 寻常css动画只能针对属性的变化
 * 这是一个dom值的变化，可以算一个典型的requestAnimationFrame运用
 */


export default ()=>{
    const [value,setValue] = useState()
    const fn = ()=>{
        const currentTimeStamp = Date.now()
        const duration =  1000;
        const callback = (timestamp)=>{
         const time = timestamp - currentTimeStamp;
         const progress = Math.min(time/duration , 1);

         //取数算法
         const access = progress * progress * value;
         //如果是state控制就在这个地方改变state
         setValue(access)
         
         if(progress<1){
            requestAnimationFrame(callback)
         }
        }
    
        requestAnimationFrame(callback)
    }


}
