
/** 核心思想就是先得出容器宽度 看在图片等宽的情况下 一行可以摆放下多少个元素
 *  声明一个数组 这个数组取存放这个一行的高度值 for循环遍历
 *  在小于单行元素个数时，也就是第一行时直接赋值
 *  从第二行开始，把取到的第一个元素放到当前高度最小的那一列去 更新最小高度
 *  直到循环结束
*/

for(var i=0;i<ccontent.length;i++){
    //前num张只要计算高度
    if(i<num){
        BoxHeightArr[i]=ccontent[i].offsetHeight
    }
    else{
        //我们要操作的box  :ccontent[i]
        var minHeight=Math.min.apply(null,BoxHeightArr)//apply:把最小值这个方法借给它用
        var minIndex=BoxHeightArr.indexOf(minHeight)//返回数组下标
        ccontent[i].style.position='absolute'//style设置样式
        ccontent[i].style.top=minHeight+'px'
        ccontent[i].style.left=imgWidth*minIndex+'px'

        //更新最矮的那一列的高度
        BoxHeightArr[minIndex]+=ccontent[i].offsetHeight
    }
}
