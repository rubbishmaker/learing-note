/**
 *
 *
 * @param {*} str 入参字符串
 * @return {boolean}  返回boolean
 */
function isDeletePalindrome(str){
    function isPalindrome(str,left = 0,right = str?.length - 1){
        while(left<right ){
         if( str[left] !== str[right]){
            return false
         }
         left++;
         right--
        }
      
        return true
      }
    let left = 0;
    let right = str.length - 1;
  
    while(left<right &&str[left]===str[right] ){
     left++;
     right--
    }
  
    if(isPalindrome(str,left+1,right)){
     return true
    }
  
    if(isPalindrome(str,left,right-1)){
     return true
    }
  
    return false
  }