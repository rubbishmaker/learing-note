/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {

   let arr =nums.slice()
   for(let i=1;i<arr.length;i++){
       arr[i] =Math.max(arr[i-1]+nums[i],nums[i])
   }

   return Math.max(...arr)
};

const result = maxSubArray([7,1,5,3,6,4])
