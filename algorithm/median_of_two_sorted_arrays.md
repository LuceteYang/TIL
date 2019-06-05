# Median of Two Sorted Arrays


> [문제출처](https://leetcode.com/problems/median-of-two-sorted-arrays/)

## 문제
There are two sorted arrays nums1 and nums2 of size m and n respectively.  

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).  

You may assume nums1 and nums2 cannot be both empty.  

median: 평균과 함께 많이 사용하는 집단 대표값인 중앙값은 표본이 가지고 있는 수치를 작은 순에서 큰 순으로 정렬해서 나열했을 때 가장 중앙에 오는 숫자를 의미합니다.  
average은 평균값  

Example1:

    nums1 = [1, 3]
    nums2 = [2]

    The median is 2.0

Example 2:

        nums1 = [1, 2]
        nums2 = [3, 4]

        The median is (2 + 3)/2 = 2.5


## 다른 풀이
```python
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        newNums = nums1 + nums2

        newNums.sort()

        value = len(newNums)

        if (value % 2) == 0:
            num1 = newNums[value//2 - 1]
            num2 = newNums[value//2]
            return (num1 + num2)/2
        else:
            return newNums[value//2]

```

