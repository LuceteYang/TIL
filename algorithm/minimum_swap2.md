# Minimum Swaps 2
> [문제출처](https://www.hackerrank.com/challenges/minimum-swaps-2/problem)

## 문제
```
You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any two elements. You need to find the minimum number of swaps required to sort the array in ascending order.

For example, given the array  we perform the following steps:

i   arr                         swap (indices)
0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
5   [1, 2, 3, 4, 5, 6, 7]
It took  swaps to sort the array.

Function Description

Complete the function minimumSwaps in the editor below. It must return an integer representing the minimum number of swaps to sort the array.

minimumSwaps has the following parameter(s):

arr: an unordered array of integers
Input Format

The first line contains an integer, , the size of . 
The second line contains  space-separated integers .

Constraints

Output Format

Return the minimum number of swaps to sort the given array.

Sample Input 0

4
4 3 1 2
Sample Output 0

3
Explanation 0

Given array  
After swapping  we get  
After swapping  we get  
After swapping  we get  
So, we need a minimum of  swaps to sort the array in ascending order.

Sample Input 1

5
2 3 4 1 5
Sample Output 1

3
Explanation 1

Given array  
After swapping  we get  
After swapping  we get  
After swapping  we get  
So, we need a minimum of  swaps to sort the array in ascending order.

Sample Input 2

7
1 3 5 2 4 6 7
Sample Output 2

3
Explanation 2

Given array  
After swapping  we get  
After swapping  we get  
After swapping  we get  
So, we need a minimum of  swaps to sort the array in ascending order.
```

## 풀이 코드
```javascript
var rotArr = Object.values(Object.assign({}, arr));
var minVal;
var maxVal = Math.max(...rotArr);
var minValInd;
var currentVal;
var swapCount = 0;

for(var i = 0; i < rotArr.length; i++){
    // get minimum values
    minVal = Math.min(...arr);

    if(minVal === rotArr[i]){
        arr.shift()
        continue;
    }

    minValInd = rotArr.indexOf(minVal);

    currentVal = rotArr[i];
    rotArr[i] = rotArr[minValInd];
    rotArr[minValInd] = currentVal;

    arr = Object.values(Object.assign({}, rotArr.slice(i)));
    arr.shift();

    minVal = Math.min(...arr);
    swapCount = swapCount +1;
}

return swapCount;
```