# Triple sum

> [문제출처](https://www.hackerrank.com/challenges/triple-sum/problem)

## 문제
```
Given  arrays  of different sizes, find the number of distinct triplets  where  is an element of , written as , , and , satisfying the criteria: .

For example, given  and , we find four distinct triplets: .

Function Description

Complete the triplets function in the editor below. It must return the number of distinct triplets that can be formed from the given arrays.

triplets has the following parameter(s):

a, b, c: three arrays of integers .
Input Format

The first line contains  integers , the sizes of the three arrays. 
The next  lines contain space-separated integers numbering  respectively.

Constraints



Output Format

Print an integer representing the number of distinct triplets.

Sample Input 0

3 2 3
1 3 5
2 3
1 2 3
Sample Output 0

8 
Explanation 0

The special triplets are  .

Sample Input 1

3 3 3
1 4 5
2 3 3
1 2 3
Sample Output 1

5 
Explanation 1

The special triplets are 

Sample Input 2

4 3 4
1 3 5 7
5 7 9
7 9 11 13
Sample Output 2

12
Explanation 2

The special triplets are .
```

## 풀이 코드
```python
def triplets(a, b, c):
    a = list(sorted(set(a)))
    b = list(sorted(set(b)))
    c = list(sorted(set(c)))
    
    ai = 0
    bi = 0
    ci = 0
    
    ans = 0
    
    while bi < len(b):
        while ai < len(a) and a[ai] <= b[bi]:
            ai += 1
        
        while ci < len(c) and c[ci] <= b[bi]:
            ci += 1
        
        ans += ai * ci
        bi += 1
    
    return ans
``