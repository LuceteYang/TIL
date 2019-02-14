# 파이썬 문법 복습
### Anaconda
* 파이썬 **`패키지 매니저`**(package manager) 와 **`개발환경 매니저`** (enviroment manager) 
* 간단하게 예를 들면, `pip`과 `venv`의 기능을 동시에 제공. 
* Conda는 Anaconda라는 Continuum Analytics에서 만든 파이썬 배포판에 포함되어 있다. 
* Anaconda는 데이터 분석 및 사이언스에 특화된 파이썬 배포판으로 Numpy, SciPy 등등 수학, 과학, 데이터 분석 분야의 패키지들, 그리고 그 외에도 여러가지의 널리 사용되는 파이썬 패키지가 종합적으로 미리 설치되어 나온다. Conda는 Anaconda에 포함되어 있는 패키지 매니저 및 개발환경 매니저 이다. 
    * Anaconda의 단점은 너무 무겁다는 것이다 (CLI 버젼이 523MB).
    * 만일 데이터 사이언스 프로젝트를 한다면 Anaconda를 설치하는 것이 좋다.
    * 하지만 그렇지 않다면 Conda만으로 충분하다. Conda는 Minoconda를 설치하면 된다. 
* https://conda.io/miniconda.html
```bash
conda create --name test python=3.6
conda info --envs
conda activate test
conda deactivate
```

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
### 함수 function
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

# function parameter
def calc(op, a, b):
    op(a,b)
    
def add(a, b):
    print(a+b)
    
def multi(a,b):
    print(a*b)

calc(add,1,2)
calc(multi,3,4)

# decorator
from functools import wraps

def para(func):
    @wraps(func)    #이걸 해줘야 __doc__ 속성이 바뀌지않음 원래 함수 속성을 래퍼에 복사하여 함수의 정보를 유지함
    def wrapper(*args, **kwargs):
        return "<p>" + str(func(*args, **kwargs))+ "</p>"   #이렇게 해야 wrapper가 가변 인수 받아 파라미터 처리 가능
    return wrapper
@para
def outname(name):
    return "이름: "+name +"님"
    
@para
def outage(age):
    return "나이: "+str(age)
    
print(outname("박상환"))   # <p>이름: 박상환님</p>
print(outage(29))   # <p>나이: 29</p>
print(outname.__name__) # outname

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
사용 용도
- index 접근 할 경우 
- 빨리 삽입이 되야할때
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
- 초기화한 후 편집할수 없다. 상수 리스트
- 리스트에 비해서 조금 더 공간 효율적이기 때문에 메모리 속도가 빠르다
- 편집되지 않을 리스트일 경우 변경 불가능 하기때문에 안전하다.

- 취약점 :  요소의 형식이 통일하지 않을수 있음
- 보완 : Namedtuple 각 위치의 의미를 명시적으로 작성
- 튜플은 딕셔너리의 키로 사용할 수 있다.
- 네임드 튜플(named tuple)은 객체의 단순한 대안이 될 수 있다. 
- 함수 인자들은 튜플로 전달된다.
```python
score = (88, 95, 100, 99)
scores = 88, 95, 100, 99

a, b, c, d = scores #unpacking

import collections

Person = collections.namedtuple("Person", 'name age gender')
P1 = Person(name='Jhon', age=28, gender='남')
P2 = Person(name='Sally', age=28, gender='여')
for n in [P1, P2]:
print('%s는(은) %d세의 %s성 입니다.' %n)
'''
결과
Jhon는(은) 28세의 남성 입니다.
Sally는(은) 28세의 여성 입니다.
'''

```

### 사전 Dictionary
키와 값의 쌍을 저장하는 대용량 자료구조  
동일한 key 넣을수없음 (hash값으로 저장하기때문에)  
JSON 라이브러리로 dictionary를 text로 바꿀수있다.  
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
**단점**  
해쉬값을 한번 계산하고 삽입해야해서 좀 느림  
**실제 예 데이터**   
여러 전화번호 그룹에서 중복된거를 뺄때
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

### Class
캡슐화
```python
class Account:
    def __init__(self,balance): # 생성자
        self.balance = balance
    def deposit(self, money):
        self.balance += money
    def inquire(self):
        print("잔액은 %d원입니다." % self.balance)

sinhan = Account(8000)
sinhan.deposit(1000)
sinhan.inquire()

class Date:
    def __init__(self, month):
        self.inner_month = month
    @property       # getter
    def month(self):
        return self.inner_month
    @month.setter   # setter
    def month(self, month):
        if 1<= month <= 12:
            self.inner_month = month
            
today = Date(8)
today.month = 15
print(today.month)

class Car:
    @staticmethod   # 클래스에 포함되는 단순한 유틸리티 메서드
    def hello():
        print("오늘도 안전 운행 합시다.")
    count = 0
    def __init__(self,name):
        self.name = name
        Car.count +=1
    @classmethod    # 클래스 전체 공유하는 함수
    def outcount(cls):
        print(cls.count)

pride = Car("프라이드")
korando = Car("코란도")        
Car.count   # 2
Car.hello() # 오늘도 안전 운행 합시다.

```
#### Decorators
* 어떠한 함수가 실행되기 전에 실행하고 싶은 함수를 편리하게 지정할 수 있는 기능.
* 주로 공통적으로 항상 먼저 실행되어야 하는 코드가 있을때 사용함. 
    * Authentication / Autorization
먼저 실행되고 다음 함수가 실행됨
1. 관계 강제성
2. 가독성
함수 안에 인자도 사용가능

```python
from functools import wraps

def test_decorator(f):
     @wraps(f)
     def decorated_function(*args, **kwargs):
         print("Decorated Function")
         return f(*args, **kwargs)
     return decorated_function


@test_decorator
 def func():
     print("Calling func function")


func()
# Decorated Function
# Calling func function

def func2():
     print("Calling func 2 function")


func2()
# Calling func 2 function
```

### module
util.py
```python
INCH = 2.54
def calsum(n):
    sum = 0
    for num in range(n +1 ):
        sum += num
    return sum
    
if __name__ == "__main__":  # 이 파일 자체 실행시 실행되는 로직
    print(INCH)
    print(calsum(10))

```
utiltest.py
```python
import util
print(util.INCH)
print(util.calsum(10))
```

### eval
```python
print(eval("2 + 3 * 4"))    # 14

a = 2
print(eval("a + 3"))    # 5

print(eval("['seoul','osan','suwon']")) # ['seoul', 'osan', 'suwon']

```

### repr
tostring 같은 느낌? eval의 반대
```python
print(repr(2 + 3 * 4))    # 14

a = 2
print(repr(a + 3))    # 5

print(repr(['seoul','osan','suwon'])) # ['seoul', 'osan', 'suwon']

# classrepr
class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
        
    def __str__(self):
        return "이름 %s, 나이 %d" % (self.name, self.age)
    def __repr__(self):
        return "Human(" + str(self.age) + ", '" + self.name + "')"

kim = Human(29,"박상환")
print(kim)
kimexp = repr(kim)
kimcopy = eval(kimexp)
print(kimcopy)

```

### exec
```python
exec("value = 3")
print(value)
```