/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {


    let arr = []
    let min = prices[0]

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i]
        }
        arr[i] = prices[i] - min
    }

    return Math.max(...arr)

};