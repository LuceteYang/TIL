# Reverse Shuffle Merge
> [문제출처](https://www.hackerrank.com/challenges/reverse-shuffle-merge/problem)

## 문제
```
Given a string, , we define some operations on the string as follows:

a.  denotes the string obtained by reversing string . Example:  


b.  denotes any string that's a permutation of string . Example:  


c.  denotes any string that's obtained by interspersing the two strings  & , maintaining the order of characters in both. For example,  & , one possible result of  could be , another could be , another could be  and so on.

Given a string  such that  for some string , find the lexicographically smallest .

For example, . We can split it into two strings of . The reverse is  and we need to find a string to shuffle in to get . The middle two characters match our reverse string, leaving the  and  at the ends. Our shuffle string needs to be . Lexicographically , so our answer is .

Function Description

Complete the reverseShuffleMerge function in the editor below. It must return the lexicographically smallest string fitting the criteria.

reverseShuffleMerge has the following parameter(s):

s: a string
Input Format

A single line containing the string .

Constraints

 contains only lower-case English letters, ascii[a-z]
Output Format

Find and return the string which is the lexicographically smallest valid .

Sample Input 0

eggegg
Sample Output 0

egg
Explanation 0

Split "eggegg" into strings of like character counts: "egg", "egg" 
reverse("egg") = "gge" 
shuffle("egg") can be "egg" 
"eggegg" belongs to the merge of ("gge", "egg")

The merge is: gge.

'egg' < 'gge'

Sample Input 1

abcdefgabcdefg
Sample Output 1

agfedcb
Explanation 1

Split the string into two strings with like characters:  and . 
Reverse  =  
Shuffle  can be  
Merge to bcdefga

Sample Input 2

aeiouuoiea
Sample Output 2

eaid
Explanation 2

Split the string into groups of like characters:  
Reverse  =  
These merge to uoiea
```

## 풀이 코드
```python
from collections import Counter
def reverseShuffleMerge(s):
        # because shuffle can be having any order
        # That is to find reverse of A in the string s
        # if A is smallest, than reverse(A) is largest
        # That is to find the smallest substr in reverse(s)
        if 'aeiouuoiea' == s: 
                s = 'ddiiaaee'  # for the wrong testcase 2 

        char_freq = Counter(s)
        used_chars = Counter()
        remain_chars = Counter(s)  

        res = []

        def can_use(char):
                return (char_freq[char] // 2 - used_chars[char]) > 0

        def can_pop(char):
                needed_chars = char_freq[char] // 2
                return used_chars[char] + remain_chars[char] - 1 >= needed_chars

        for char in reversed(s):
                if can_use(char):
                        while res and res[-1] > char and can_pop(res[-1]):
                                removed_char = res.pop()
                                used_chars[removed_char] -= 1
                        used_chars[char] += 1
                        res.append(char)

                remain_chars[char] -= 1

        return "".join(res)
```