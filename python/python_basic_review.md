# 파이썬 문법 복습


### print
```python
print("hello world")    # hello world

print("서울","대전","대구","부산", sep = ' 찍고 ', end = '~끝')    # 서울 찍고 대전 찍고 대구 찍고 부산 ~끝
year = 2016
month = 1
day = 16
day_of_week = "일"
print("현재 %d달러는 %s돈 %f원입니다." % ( 1,"한국",1122.73))

```

### type check
```python
print(type(4 / 2))  # - <class 'int'>
print(type("True"))  # - <class 'bool'>
print(type(2.0 ** 3))  # - <class 'float'>
print(type(2 * 3 == 6))  # - <class 'int'>
```

### type 불일치 에러나는 경우
```python
#TypeError: unsupported operand type(s)
print(4+"3")
print("hello"-"ll")
print("hello"-1)
print("korea"+2002) # => print("korea"+str(2002))

```
### if문
```python
if 1 == (3 - 1) or ((True and 0) == False):
    print("OK")     # OK

age = 23
if age < 19:
    print("애들은 가라")
elif age < 25:
    print("대학생입니다")
else:
    print("어서 옵쇼")    
```
### for문
```python
for num in range(1,6):
    print(num)  # 1 2 3 4 5

arr = ['first','second','third']
for index in range(len(arr)):
    print(arr[index])

```
### 함수
```python
def myself(name, nationality="한국"):
    print("내 이름은 %s" % name)
    print("국적은 %s" % nationality)
myself("sanghwan")
myself("sanghwan","대한민국")

# 가변 인수
def intsum(*ints):
    sum = 0
    for num in ints:
        sum += num
    print(sum)
    return sum

intsum(1, 2, 3)     #6

intsum(1, 2, 3, 4)  #10

# 키워드 가변 인수
def calcstep(**args):
    begin = args['begin']
    end = args['end']
    step = args['step']
    sum = 0
    for num in range(begin, end + 1, step):
        sum += num
    return sum


print("3 ~ 5 = ", calcstep(begin=3, end=5, step=1)) #   3 ~ 5 =  12
```

### 변수의 범위
```python
salerate = 0.9

def kim():
    print("kim 할인율 : ",salerate)

def lee():
    print("lee 할인율 : ",salerate)
    
kim()   # kim 할인율 :  0.9
salerate = 1.1
lee()  # lee 할인율 :  1.1


price = 1000

def sale():
    price = 500

sale()
print(price)    #1000

def globalSale():
    global price
    price = 500

globalSale()     
print(price)    #500

```

### 문자열 관리
| isdecimal()  | isdigit() |  isnumeric() |
| -------------- | ------------------------ | ----------- |
| Example of string with decimal characters: |Example of string with digits: |Example of string with numerics: |
"12345" |"12345" |"12345"|
"12" |"3²" | "½¼" |
"98201"  | "3²"| "½"  |

```python
# strip
s = "    angel    "
print(s.lstrip()+"님")   #angel    님
print(s.rstrip()+"님")   #    angel님
print(s.strip()+"님")    #angel님

#split
s2 = "서울=>대전=>대구=>부산"
print(s2.split("=>"))   # ['서울', '대전', '대구', '부산']

#replace
s3 = "가나가다가라가마"
s3 = s3.replace("가", "하")
print(s3)   # 하나하다하라하마

```

### 리스트 List
```python
# listslice
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums[2:5])    # [2,3,4]
print(nums[:4])     # [0, 1, 2, 3] 
print(nums[6:])     # [6, 7, 8, 9]

nums[2:5] = [] 
print(nums)     # [0, 1, 5, 6, 7, 8, 9]

del nums[0]
print(nums)     # [1, 5, 6, 7, 8, 9]

list2 = [10]

listadd = nums + list2  # [1, 5, 6, 7, 8, 9, 10]

nums.append(11) # [1, 5, 6, 7, 8, 9, 11]

nums.insert(2, 99) # [1, 5, 99, 6, 7, 8, 9, 11]

nums[2:2] = [90, 91, 92] # [1, 5, 90, 91, 92, 99, 6, 7, 8, 9, 11]
list1 = [1, 2, 3]
list2 = [4, 5]
list1.extend(list2)   # [1, 2, 3, 4, 5]

list1.remove(4) # [1, 2, 3, 5]

list1.pop()  # [1, 2, 3] 삭제한 요소 리턴

list1.index(3) # 2

list1.count(3) # 1

3 in list1 # True

score = [45, 89, 72, 53, 94]
score2 = sorted(score)

score.sort()

print(score==score2)    #True

def flunk(s):
    return s < 60


list(filter(flunk, score))

list(filter(lambda x:x <60, score))

def half(s):
    return s / 2
    
list(map(half, score))
 
list(map(lambda x:x /2, score))


```

### 튜플 Tuple
초기화한 후 편집할수 없다. 상수 리스트
메모리 속도가 빠르다
편집되지 않을 리스트일 경우 변경 불가능 하기때문에 안전하다.
```python
score = (88, 95, 100, 99)
scores = 88, 95, 100, 99

a, b, c, d = scores #unpacking

```

### 사전 Dictionary
키와 값의 쌍을 저장하는 애용량 자료구조
```python
dic = dict()
dic = {'boy':'소년',"girl":"소녀"}
dic.get("ddd")   # None
dic['ddd']       # KeyError: 'ddd'
'boy' in dic     # True
del dic['boy']
for key in dic.keys():
    print(dic[key])
dic.values()
dic.items()
list(dic.items())   #list로 변환
```

### 집합 Set
키의 중복을 허락하지 않으며 순서도 의미 없는 모임
```python
sets = {'abc','def','ghi'}
set("abc")
set([12, 13, 14])
set((12, 13, 14))
set()
sets.add('jkl')
sets.remove('abc')  # {'def', 'ghi', 'jkl'}

setb = {'jkl', 'mno'}
print(sets - setb)  # {'def', 'ghi'}
print(sets | setb)  # {'jkl', 'ghi', 'def', 'mno'}
print(sets & setb)  # {'jkl'}
```


### Copy
```python
# variable
a = 3
b = a
a = 5
print("a = %d, b = %d" % (a, b))

# list
import copy

list1 = [{'a':1}, 2, 3]
list2 = list1.copy()

list3 = copy.deepcopy(list1)

list1[0]['a'] = 2
print(list1)    # [{'a': 2}, 2, 3]
print(list2)    # [{'a': 2}, 2, 3]
print(list3)    # [{'a': 1}, 2, 3]
```

### time
```python
import time
now = time.localtime()
print("%d년 %d월 %d일" % (now.tm_year, now.tm_mon, now.tm_mday))
print("%d:%d:%d" % (now.tm_hour, now.tm_min, now.tm_sec))

import datetime
now = datetime.datetime.now()
#함수 이름이 좀더 짧고 직관적
print("%d년 %d월 %d일" % (now.year, now.month, now.day))
print("%d:%d:%d" % (now.hour, now.minute, now.second))

time.sleep(1)   # 1초 지연
```

### random
```python
import random
print(random.randint(1, 10))

food = ["remon", "banana", "apple", "grape"]
print(random.choice(food))      # banana

print(random.sample(food, 2))   # ['remon', 'apple']

print(random.shuffle(food))     # ['apple', 'remon', 'banana', 'grape']
```

### 예외처리
```python
str = "89점"
try:
    score = int(str)
    print(score)
except Exception as e:
    if hasattr(e, 'message'):
        print(e.message)
    else:
        print(e)
else:
    print(score)
finally:
    print("접속 해제")
print("작업 완료")
```