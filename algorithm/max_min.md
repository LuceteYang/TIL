# Max Min


> [문제출처](https://www.hackerrank.com/challenges/angry-children/problem)

## 문제
```
You will be given a list of integers, , and a single integer . You must create an array of length  from elements of  such that its unfairness is minimized. Call that array . Unfairness of an array is calculated as

Where: 
- max denotes the largest integer in  
- min denotes the smallest integer in 

As an example, consider the array  with a  of . Pick any two elements, test . 
 
Testing for all pairs, the solution  provides the minimum unfairness.

Note: Integers in  may not be unique.

Function Description

Complete the maxMin function in the editor below. It must return an integer that denotes the minimum possible value of unfairness.

maxMin has the following parameter(s):

k: an integer, the number of elements in the array to create
arr: an array of integers .
Input Format

The first line contains an integer , the number of elements in array . 
The second line contains an integer . 
Each of the next  lines contains an integer  where .

Constraints

 
 

Output Format

An integer that denotes the minimum possible value of unfairness.

Sample Input 0

7
3
10
100
300
200
1000
20
30
Sample Output 0

20
Explanation 0

Here ; selecting the  integers , unfairness equals

max(10,20,30) - min(10,20,30) = 30 - 10 = 20
Sample Input 1

10
4
1
2
3
4
10
20
30
40
100
200
Sample Output 1

3
Explanation 1

Here ; selecting the  integers , unfairness equals

max(1,2,3,4) - min(1,2,3,4) = 4 - 1 = 3
Sample Input 2

5
2
1
2
1
2
1
Sample Output 2

0
Explanation 2

Here .  or  give the minimum unfairness of .

```

## 풀이코드

```python
def maxMin(k, arr):
    arr.sort()
    minimun = None
    for item in range(0,len(arr)-k+1):
        if minimun is None or minimun>(arr[item+k-1])-(arr[item]):
            minimun=(arr[item+k-1])-(arr[item])
    return minimun
```