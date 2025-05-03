/**
 *
 *
 * @param {*} str string
 * @return {*} 
 */
function palindromeNum(str){

    let ans = 0
    for(let i = 0;i<s.length;i++){
        for(let j =0;j<=1;j++){
            let left = i;
            let right = i+j
            while(left>=0 && right<=s.length-1 && s[left--]===s[right++]){
              ans++  
            }
        }
    }
    return ans

}