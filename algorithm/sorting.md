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
