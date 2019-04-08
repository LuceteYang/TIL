# Merge Sort
> [문제출처](https://www.hackerrank.com/challenges/ctci-merge-sort/problem)

## 문제
```
Check out the resources on the page's right side to learn more about merge sort. The video tutorial is by Gayle Laakmann McDowell, author of the best-selling interview book Cracking the Coding Interview.

In an array, , the elements at indices  and  (where ) form an inversion if . In other words, inverted elements  and  are considered to be "out of order". To correct an inversion, we can swap adjacent elements.

For example, consider the dataset . It has two inversions:  and . To sort the array, we must perform the following two swaps to correct the inversions:

Given  datasets, print the number of inversions that must be swapped to sort each dataset on a new line.

Function Description

Complete the function countInversions in the editor below. It must return an integer representing the number of inversions required to sort the array.

countInversions has the following parameter(s):

arr: an array of integers to sort .
Input Format

The first line contains an integer, , the number of datasets.

Each of the next  pairs of lines is as follows:

The first line contains an integer, , the number of elements in .
The second line contains  space-separated integers, .
Constraints

Output Format

For each of the  datasets, return the number of inversions that must be swapped to sort the dataset.

Sample Input

2  
5  
1 1 1 2 2  
5  
2 1 3 1 2
Sample Output

0  
4   
Explanation

We sort the following  datasets:

 is already sorted, so there are no inversions for us to correct. Thus, we print  on a new line.
We performed a total of  swaps to correct inversions.
```


## 풀이 코드
```python
#!/bin/python3

import math
import os
import random
import re
import sys

def countInversions(arr):
    res = [0] * len(arr)

    return merge(arr, res, 0, len(arr)-1)

def merge(arr, res, left, right):
    if left >= right:
        return 0

    inversions = 0

    left_end = (left + right) // 2
    right_start = left_end + 1

    inversions += merge(arr, res, left, left_end)
    inversions += merge(arr, res, right_start, right)
    inversions += mergeHalf(arr, res, left, right)
    return inversions

def mergeHalf(arr, res, left, right):
    if left >= right:
        return 0

    inversions = 0

    left_end = mid = (left + right) // 2
    right_start = right_beg = left_end + 1
    left_beg = index = left

    while left <= left_end and right_start <= right:
        pt1 = arr[left]
        pt2 = arr[right_start]

        if pt1 <= pt2:
            res[index] = pt1
            index += 1
            left += 1
        else:
            res[index] = pt2
            index += 1
            inversions += mid - left + 1
            right_start += 1

    while left <= left_end:
        res[index] = arr[left]
        left += 1
        index += 1

    while right_start <= right:
        res[index] = arr[right_start]
        right_start += 1
        index += 1


    arr[left_beg:left_end + 1] = res[left_beg:left_end + 1]
    arr[right_beg:right + 1] = res[right_beg: right + 1]

    return inversions
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    t = int(input())

    for t_itr in range(t):
        n = int(input())

        arr = list(map(int, input().rstrip().split()))

        result = countInversions(arr)

        fptr.write(str(result) + '\n')

    fptr.close()

```
