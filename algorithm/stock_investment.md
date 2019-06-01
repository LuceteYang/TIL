# 주식 투자
오늘 부터 N일(DAY) 동안 구글의 주가를 예측할 수 있는 알고리즘을 개발했다  
N일 동안 각각의 날에 다음의 액션 중 하나를 할 수 있다.  
1) 어떤 날은 구글 주식 1주를 살 수 있다.  
2) 어떤 날은 가지고 있는 주식 중 일부 혹은 전부를 팔 수 있다.  
3) 어떤 날은 아무런 액션을 취하지 않을 수도 있다.  

N일 뒤에 최고의 수익을 남기기 위해서는 어떠한 전략을 수행해야 하는가?  

### 입력
첫 줄에는 테스트 케이스의 수 T를 입력받는다.  
다음에는 숫자 N을 입력한다.  
그 다음 줄에는 N일 동안 예측한 주식의 가격을 입력한다.(모든 정수, 스페이스로 구분) 이것을 T만큼 반복한다.  

### 출력
각각의 테스트 케이스에 대해서 최고로 얻을 수 있는 수익을 출력한다.  

### 입력 예제
3  
3  
5 3 2  
3  
1 2 100  
4  
1 3 1 2  

### 출력 예제
0  
197  
3  

예제 설명  
3개의 테스트 케이스  
첫번째 테스트 케이스  
- 주가가 5 > 3 >2로 떨어지기만 한다. 이래사는 수익을 낼수가 없다.  
두번째 테스트 케이스  
- 1일과 2일에는 1주씩 구매한다. 3일때 모든 주식을 판매한다.  
세번째 테스트 케이스  
1일째 1주를 구매하고 2일째 이 것을 판매한다. 3일째 다시 1주를 구매하고 4일째 판매한다.  

### 풀이
```python
T = input()
def calculateMaxPrice(array):
    if len(array) < 2:
        return 0
    maxPriceIndex = array.index(max(array))
    return len(array[0:maxPriceIndex]) * array[maxPriceIndex] - sum(array[0:maxPriceIndex]) +     calculateMaxPrice(array[maxPriceIndex+1:len(array)])

for index in range(0, int(T)):
    N = input()
    prices_input = input()
    prices = [int(x) for x in prices_input.split(" ")]
    benefit = calculateMaxPrice(prices)
    print(benefit)
```