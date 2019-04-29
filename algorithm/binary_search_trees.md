# Binary Search Trees


> [문제출처](https://www.hackerrank.com/challenges/decibinary-numbers/problem)

## 문제
```
Objective 
Today, we're working with Binary Search Trees (BSTs). Check out the Tutorial tab for learning materials and an instructional video!

Task 
The height of a binary search tree is the number of edges between the tree's root and its furthest leaf. You are given a pointer, , pointing to the root of a binary search tree. Complete the getHeight function provided in your editor so that it returns the height of the binary search tree.

Input Format

The locked stub code in your editor reads the following inputs and assembles them into a binary search tree: 
The first line contains an integer, , denoting the number of nodes in the tree. 
Each of the  subsequent lines contains an integer, , denoting the value of an element that must be added to the BST.

Output Format

The locked stub code in your editor will print the integer returned by your getHeight function denoting the height of the BST.

Sample Input

7
3
5
2
1
4
6
7
Sample Output

3
Explanation

The input forms the following BST:

BST.png

The longest root-to-leaf path is shown below:

Longest RTL.png

There are  nodes in this path that are connected by  edges, meaning our BST's . Thus, we print  as our answer.
```


## 풀이 코드
```python
def whatFlavors(cost, money):
    dict = {}
    for pos in range(len(cost)):
        if cost[pos] < money:
            val = money - cost[pos]
            if val in dict:
                print(dict[val] + 1, pos + 1)
                return
            else:
                dict[cost[pos]] = pos
```