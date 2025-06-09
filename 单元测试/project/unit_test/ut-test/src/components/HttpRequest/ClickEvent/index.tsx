import React from "react";

export default ()=>{
    
    const [clicked,setClicked] = React.useState(false);
    
    const handleClick = ()=>{
        // 模拟一个点击事件
        // 这里可以添加其他逻辑，比如发送请求等
        setClicked(true)
    }
    return <div>
        <button onClick={handleClick}>点击</button>

        {clicked && <p>按钮已被点击</p>}
    </div>
}