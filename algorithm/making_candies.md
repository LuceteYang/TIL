# Making Candies

> [문제출처](https://www.hackerrank.com/challenges/making-candies/problem)

## 문제
```
Karl loves playing games on social networking sites. His current favorite is CandyMaker, where the goal is to make candies.

Karl just started a level in which he must accumulate  candies starting with  machines and  workers. In a single pass, he can make  candies. After each pass, he can decide whether to spend some of his candies to buy more machines or hire more workers. Buying a machine or hiring a worker costs  units, and there is no limit to the number of machines he can own or workers he can employ.

Karl wants to minimize the number of passes to obtain the required number of candies at the end of a day. Determine that number of passes.

For example, Karl starts with  machine and  workers. The cost to purchase or hire,  and he needs to accumulate  candies. He executes the following strategy:

Make  candies. Purchase two machines.
Make  candies. Purchase  machines and hire  workers.
Make  candies. Retain all  candies.
Make  candies. With yesterday's production, Karl has  candies.
It took  passes to make enough candies.

Function Description

Complete the minimumPasses function in the editor below. The function must return a long integer representing the minimum number of passes required.

minimumPasses has the following parameter(s):

m: long integer, the starting number of machines
w: long integer, the starting number of workers
p: long integer, the cost of a new hire or a new machine
n: long integer, the number of candies to produce
Input Format

A single line consisting of four space-separated integers describing the values of , , , and , the starting number of machines and workers, the cost of a new machine or a new hire, and the the number of candies Karl must accumulate to complete the level.

Constraints

Output Format

Return a long integer denoting the minimum number of passes required to accumulate at least  candies.

Sample Input

3 1 2 12
Sample Output

3
Explanation

Karl makes three passes:

In the first pass, he makes  candies. He then spends  of them hiring another worker, so and he has one candy left over.
In the second pass, he makes  candies. He spends  of them on another machine and another worker, so  and  and he has  candies left over.
In the third pass, Karl makes  candies. Because this satisfies his goal of making at least  candies, we print the number of passes (i.e., ) as our answer.
```

## 풀이 코드
```python
def minimumPasses(machines, workers, price, target):
    iter = 0
    coins = 0

    def new_infra(n_items):
        new_machines = machines
        new_workers = workers
        
        delta = max(new_machines, new_workers) - min(new_machines, new_workers)
        # delta is bounded by number of items we can afford
        delta = min(delta, n_items)
        
        rest = n_items - delta
        a,b = rest // 2, rest // 2
        #f rest of items to distribute is odd, add extra 1 (since 7//2 is 3) to any item
        if rest & 1: b += 1
        
        if new_machines < new_workers: 
            new_machines += delta
        else:
            new_workers += delta
            
        new_machines += a
        new_workers += b
        
        return new_machines, new_workers
    
    def items_worth_buying():
        n_items = coins // price
        rest_coins = coins - n_items * price
        
        new_machines, new_workers = new_infra(n_items)
        rem_days_if_buying = math.ceil(float(target - rest_coins) / (new_machines * new_workers))
        rem_days_if_not_buying = math.ceil(float(target - coins) / (machines * workers))

        # always prefer buying rather than saving
        # by saving to improvement can be achieved
        return n_items if rem_days_if_buying <= rem_days_if_not_buying else -1

    while True:
        speed = machines * workers
        next_improv_iter = int(math.ceil(float(price - coins) / speed))
        rem_iter_till_finish = int(math.ceil(float(target - coins) / speed))

        if next_improv_iter >= rem_iter_till_finish:
            return iter + rem_iter_till_finish
        
        ## improvement will happen earlier than finish
        n_items = items_worth_buying()
        if n_items == -1:
            ## -1 indicates that if we are buying new items, we are still not faster 
            ## if that's the case, we already know the end date
            return iter + rem_iter_till_finish
        
        coins_prod_till_next_improv_iter = next_improv_iter * speed
        coins += coins_prod_till_next_improv_iter

        machines, workers = new_infra(n_items)
        coins -= price * n_items

        iter += next_improv_iter
``