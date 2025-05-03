// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

function maxLengthNum(nums){
    let ans = 0
  const set = new Set(nums);
  for(let value of set){
    if(set.has(value - 1)){
        continue
    }

    //现在捕捉的就是最小的
    let current  = value
    while(set.has(current)){
        current++
    }
    ans  = Math.max(ans,current- value)
  }

  return ans
}