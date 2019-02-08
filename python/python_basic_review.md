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
