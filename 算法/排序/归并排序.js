
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // 比较两个数组的元素，将较小的添加到结果中
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // 添加左数组中剩余的元素
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // 添加右数组中剩余的元素
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}

function mergeSort(arr) {
    // 基本情况：数组长度为0或1时已经排序好了
    if (arr.length <= 1) {
        return arr;
    }
    const len = Math.floor(arr.length / 2);


    const left = mergeSort(arr.slice(0, len))
    const right = mergeSort(arr.slice(len))
    return  merge(left, right)

}