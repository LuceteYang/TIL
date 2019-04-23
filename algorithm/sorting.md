# Sorting 정렬

## 선택정렬(Selection Sort)
가장 작은 것을 선택해서 제일 앞으로 보내는 알고리즘
가장 원시적이고 기초적인 방법 중 하나입니다.

선택 정렬의 시간 복잡도는 O(N^2)입니다.
```python
array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9]
for i in range(len(array)):
	min = 9999
	for j in range(i,len(array)):
		if min > array[j]:
			min = array[j]
			index = j
	temp = array[i]
	array[i] = array[index]
	array[index] = temp
print(array)

```

## 버블 정렬(Bubble Sort)
바로 가까이에 있는 두 숫자끼리 비교를 해서 당장 더 작은 숫자를 앞으로 보내주는 것을 반복하는 겁니다.
버블 정렬의 시간 복잡도는 O(N^2)입니다.
```python
array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9]
for i in range(len(array)):
	for j in range(9-i):
		if array[j] > array[j+1]:
			temp = array[j]
			array[j] = array[j+1]
			array[j+1] = temp
print(array)

```

## 삽입 정렬(Insertion Sort)
각 숫자를 적절한 위치에 삽입하는 방법으로 문제를 해결합니다. 다른 정렬 방식들은 무조건 위치를 바꾸는 방식이었다면 삽입 정렬은 '필요할 때만' 위치를 바꾸게 됩니다.
필요할 때에 한해서만 삽입을 진행하기 때문에 데이터가 이미 거의 정렬된 상태에 한해서는 어떤 알고리즘보다도 빠르다는 특징
삽입 정렬의 시간 복잡도는 O(N^2)입니다.

```python
array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9]
for i in range(len(array)-1):
	j = i
	while j>= 0 and array[j]> array[j+1]:
		temp = array[j]
		array[j] = array[j+1]
		array[j+1] = temp
		j-=1
print(array)
```


## 퀵 정렬(Quick Sort)
빠른 알고리즘이 바로 퀵 정렬 알고리즘
퀵 정렬은 분할정복(divide and conquer) 방식으로 작동합니다.
- 리스트 가운데서 하나의 원소를 고릅니다. 이를 피벗(pivot)이라 합니다.
- 피벗 앞에는 피벗보다 작은 값, 뒤에는 큰 값이 오도록 하여 리스트를 둘로 분할합니다.
- 분할된 두 개 리스트 각각에 재귀적으로 이 과정을 반복합니다.
퀵 정렬의 평균 시간 복잡도는 O(N * logN)입니다.
퀵 정렬의 최악 시간 복잡도는 O(N^2)입니다.(이미 정렬이 되어 있는 경우)

```python
array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9]
def quick_sort(ARRAY):
    ARRAY_LENGTH = len(ARRAY)
    if( ARRAY_LENGTH <= 1):
        return ARRAY
    else:
        PIVOT = ARRAY[0]
        GREATER = [ element for element in ARRAY[1:] if element > PIVOT ]
        LESSER = [ element for element in ARRAY[1:] if element <= PIVOT ]
        return quick_sort(LESSER) + [PIVOT] + quick_sort(GREATER)
print(quick_sort(array))

```

## 병합정렬(Merge Sort)
분할 정복 방법을 채택한 알고리즘
시간 복잡도는 최악의 경우에도 O(N * logN)을 보장
'기존의 데이터를 담을 추가적인 배열 공간이 필요하다'는 점에서 메모리 활용이 비효율적이라는 문제가 있습니다.
```python
array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9]
def merge_sort(list):
    if len(list) <= 1:
        return list
    mid = len(list) // 2
    leftList = list[:mid]
    rightList = list[mid:]
    leftList = merge_sort(leftList)
    rightList = merge_sort(rightList)
    return merge(leftList, rightList)

def merge(left, right):
    result = []
    while len(left) > 0 or len(right) > 0:
        if len(left) > 0 and len(right) > 0:
            if left[0] <= right[0]:
                result.append(left[0])
                left = left[1:]
            else:
                result.append(right[0])
                right = right[1:]
        elif len(left) > 0:
            result.append(left[0])
            left = left[1:]
        elif len(right) > 0:
            result.append(right[0])
            right = right[1:]
    return result
print(quick_sort(array))
```

## 힙 정렬(Heap Sort)
Heap
큰 키(우선 순위)에 자주 액세스하거나 키(우선 순위) 중심으로 정렬된 시퀀스를 활용해야 할 때 유용한 자료구조입니다. 
힙은 한 노드(node)가 최대 두 개의 자식노드(child node)를 가지면서, 마지막 레벨을 제외한 모든 레벨에서 노드들이 꽉 채워진 완전이진트리(complete binary tree)를 기본으로 합니다.
- heap order property : 각 노드의 값은 자신의 자식노드가 가진 값보다 크거나 같다(최대 힙, Max heap). 각 노드의 값은 자신의 자식노드가 가진 값보다 작거나 같다(최소 힙, Min heap).
- heap shape property : 모양은 완전이진트리이다. 즉 마지막 레벨의 모든 노드는 왼쪽에 쏠려 있다.

힙 정렬은 힙 트리 구조(Heap Tree Structure)를 이용하는 정렬 방법입니다.
힙 정렬(Heap Sort)은 병합 정렬(Merge Sort)와 퀵 정렬(Quick Sort)만큼 빠른 정렬 알고리즘입니다.
1. 주어진 원소들로 최대 힙을 구성합니다.
2. 최대 힙의 루트노드(=현재 배열의 첫번째 요소=최댓값)와 말단노드(=현재 배열의 마지막 요소)를 교환해 줍니다.
3. 새 루트노드에 대해 최대 힙을 구성합니다.
4. 원소의 개수만큼 2와 3을 반복 수행합니다.
```python
array = [1, 10, 5, 8, 7, 6, 4, 3, 2, 9]

def heapify(unsorted, index, heap_size):
    largest = index
    left_index = 2 * index + 1
    right_index = 2 * index + 2
    if left_index < heap_size and unsorted[left_index] > unsorted[largest]:
        largest = left_index
    if right_index < heap_size and unsorted[right_index] > unsorted[largest]:
        largest = right_index
    if largest != index:
        unsorted[largest], unsorted[index] = unsorted[index], unsorted[largest]
        heapify(unsorted, largest, heap_size)

def heap_sort(unsorted):
    n = len(unsorted)
    # BUILD-MAX-HEAP (A) : 위의 1단계
    # 인덱스 : (n을 2로 나눈 몫-1)~0
    # 최초 힙 구성시 배열의 중간부터 시작하면 
    # 이진트리 성질에 의해 모든 요소값을 
    # 서로 한번씩 비교할 수 있게 됨 : O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(unsorted, i, n)
    # Recurrent (B) : 2~4단계
    # 한번 힙이 구성되면 개별 노드는
    # 최악의 경우에도 트리의 높이(logn)
    # 만큼의 자리 이동을 하게 됨
    # 이런 노드들이 n개 있으므로 : O(nlogn)
    for i in range(n - 1, 0, -1):
        unsorted[0], unsorted[i] = unsorted[i], unsorted[0]
        heapify(unsorted, 0, i)
    return unsorted
print(heap_sort(array))
```
계수 정렬(Counting Sort)
'범위 조건'이 있는 경우에 한해서 굉장히 빠른 알고리즘
K가 정수일 때 (즉, K가 어떤 최대값을 가질때), 입력 요소들이 1부터 K까지의 정수라고 가정.
'크기를 기준'으로 갯수만 세주면 되기 때문에 위치를 바꿀 필요가 없습니다. 또한 모든 데이터에 한 번씩만 접근하면 된다는 점에서 무척이나 효율적입니다.
계수 정렬(Counting Sort)의 시간 복잡도는 O(N)입니다.





