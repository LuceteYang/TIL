# Abbreviation

> [문제출처](https://www.hackerrank.com/challenges/abbr/problem)

## 문제
```
You can perform the following operations on the string, :

Capitalize zero or more of 's lowercase letters.
Delete all of the remaining lowercase letters in .
Given two strings,  and , determine if it's possible to make  equal to  as described. If so, print YES on a new line. Otherwise, print NO.

For example, given  and , in  we can convert  and delete  to match . If  and , matching is not possible because letters may only be capitalized or discarded, not changed.

Function Description

Complete the function  in the editor below. It must return either  or .

abbreviation has the following parameter(s):

a: the string to modify
b: the string to match
Input Format

The first line contains a single integer , the number of queries.

Each of the next  pairs of lines is as follows: 
- The first line of each query contains a single string, . 
- The second line of each query contains a single string, .

Constraints

String  consists only of uppercase and lowercase English letters, ascii[A-Za-z].
String  consists only of uppercase English letters, ascii[A-Z].
Output Format

For each query, print YES on a new line if it's possible to make string  equal to string . Otherwise, print NO.

Sample Input

1
daBcd
ABC
Sample Output

YES
Explanation

image

We have  daBcd and  ABC. We perform the following operation:

Capitalize the letters a and c in  so that  dABCd.
Delete all the remaining lowercase letters in  so that  ABC.
Because we were able to successfully convert  to , we print YES on a new line.

```

## 풀이코드

```python
def abbreviation(a, b, i=0, j=0, checked=None):
    checked = set() if checked is None else checked  # 1
    if j == len(b):  # 2
        more_uppers = any(char.isupper() for char in a[i:])
        return "NO" if more_uppers else "YES"
    for k in range(i, len(a)):  # 3
        if a[k].isupper() and a[k] != b[j]:  # 4
            return "NO"
        if a[k].upper() == b[j]:  # 5
            if (k, j) in checked:  # 6
                pass
            elif abbreviation(a,b,k+1,j+1,checked) == "YES":  # 7
                return "YES"
            else:
                checked.add((k, j))
            if a[k].isupper():  # 8
                return "NO"
    return "NO" # 9
```