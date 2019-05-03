# Running Time and Complexity

> [문제출처](https://www.hackerrank.com/challenges/30-running-time-and-complexity/problem)

## 문제
```
Objective 
Today we're learning about running time! Check out the Tutorial tab for learning materials and an instructional video!

Task 
A prime is a natural number greater than  that has no positive divisors other than  and itself. Given a number, , determine and print whether it's  or .

Note: If possible, try to come up with a  primality algorithm, or see what sort of optimizations you come up with for an  algorithm. Be sure to check out the Editorial after submitting your code!

Input Format

The first line contains an integer, , the number of test cases. 
Each of the  subsequent lines contains an integer, , to be tested for primality.

Constraints

Output Format

For each test case, print whether  is  or  on a new line.

Sample Input

3
12
5
7
Sample Output

Not prime
Prime
Prime
Explanation

Test Case 0: . 
 is divisible by numbers other than  and itself (i.e.: , , ), so we print  on a new line.

Test Case 1: . 
 is only divisible  and itself, so we print  on a new line.

Test Case 2: . 
 is only divisible  and itself, so we print  on a new line.
```

## 풀이코드

```python
def isprime(n):
    if n == 1:
        return 'Not prime'
    for i in range(2, int(n**0.5) + 1):
        if n%i == 0:
            return 'Not prime'
    return 'Prime'

T = int(input())
for i in range(T):
    number = int(input())
    print(isprime(number))
```