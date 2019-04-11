# Common Child

> [문제출처](https://www.hackerrank.com/challenges/common-child/problem)

## 문제
```
A string is said to be a child of a another string if it can be formed by deleting 0 or more characters from the other string. Given two strings of equal length, what's the longest string that can be constructed such that it is a child of both?

For example, ABCD and ABDC have two children with maximum length 3, ABC and ABD. They can be formed by eliminating either the D or C from both strings. Note that we will not consider ABCD as a common child because we can't rearrange characters and ABCD  ABDC.

Function Description

Complete the commonChild function in the editor below. It should return the longest string which is a common child of the input strings.

commonChild has the following parameter(s):

s1, s2: two equal length strings
Input Format

There is one line with two space-separated strings,  and .

Constraints

All characters are upper case in the range ascii[A-Z].
Output Format

Print the length of the longest string , such that  is a child of both  and .

Sample Input

HARRY
SALLY
Sample Output

 2
Explanation

The longest string that can be formed by deleting zero or more characters from  and  is , whose length is 2.

Sample Input 1

AA
BB
Sample Output 1

0
Explanation 1

 and  have no characters in common and hence the output is 0.

Sample Input 2

SHINCHAN
NOHARAAA
Sample Output 2

3
Explanation 2

The longest string that can be formed between  and  while maintaining the order is .

Sample Input 3

ABCDEF
FBDAMN
Sample Output 3

2
Explanation 3 
 is the longest child of the given strings.
```

 ## 내가 했던 풀이
```python
def commonChild(s1, s2):
    commonset = set()
    for s in s1:
        if s in s2:
            commonset.add(s)
    return len(commonset)
```

## 다른 사람 풀이 코드
```javascript
function commonChild(s1, s2) {
    let arr = [Array(s2.length + 1).fill(0)];
    [...s1].forEach((v1, i) => {
        arr[i + 1] = [0];
        [...s2].forEach((v2, j) => {
            arr[i + 1][j + 1] = v1 === v2 ?
                arr[i][j] + 1 : Math.max(arr[i + 1][j], arr[i][j + 1]);
        });
    });
    return arr[s2.length][s1.length];
}

``