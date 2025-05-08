 function lengthOfLongestSubstring(s) {
    //声明一个数组， 当碰到重复的应该从这里截断。
let list = [];
let ans = 0
for(let i =0;i<s.length;i++){
  if(list?.includes(s[i])){
      const index = list.indexOf(s[i])
      list.splice(0,index+1)
  }
  list.push(s[i])
  ans = Math.max(ans,list.length)

}
return ans
};