# Two Sum


> [문제출처](https://leetcode.com/problems/two-sum)

## 문제
Given an array of integers, return indices of the two numbers such that they add up to a specific target.  

You may assume that each input would have exactly one solution, and you may not use the same element twice.  

Example:

	Given nums = [2, 7, 11, 15], target = 9,

	Because nums[0] + nums[1] = 2 + 7 = 9,
	return [0, 1].


## 내가 푼 코드

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for frontIndex in range(0,len(nums)):
            for backIndex in range(0,len(nums)):
                if frontIndex==backIndex:
                    break
                result = nums[frontIndex]+nums[backIndex]
                if result == target:
                    return [frontIndex,backIndex]
```
Time complexity : O(n^2)


## 다른 풀이
```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        h = {}
        for i, num in enumerate(nums):
            n = target - num
            if n not in h:
                h[num] = i
            else:
                return [h[n], i]
```
Time complexity : O(n)

