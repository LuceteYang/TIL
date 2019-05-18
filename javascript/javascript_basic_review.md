# 자바스트립트 문법 복습

### Hoisting
`hoist` 라는 단어의 사전적 정의는 끌어올리기 라는 뜻이다. 자바스크립트에서 끌어올려지는 것은 변수이다. `var` keyword 로 선언된 모든 변수 선언은 **호이스트** 된다. 호이스트란 변수의 정의가 그 범위에 따라 `선언`과 `할당`으로 분리되는 것을 의미한다. 즉, 변수가 함수 내에서 정의되었을 경우, 선언이 함수의 최상위로, 함수 바깥에서 정의되었을 경우, 전역 컨텍스트의 최상위로 변경이 된다.

우선, 선언(Declaration)과 할당(Assignment)을 이해해야 한다. 끌어올려지는 것은 선언이다.
```javascript
function showName() {
     
     console.log("First Name : " + name);	// First Name : undefined
     console.log("First Name : " + abc);	// ReferenceError: abc is not defined
     var name = "Ford";
     console.log("Last Name : " + name);
}
showName();

function showJob() {
	console.log("First Job : " + abc);		// ReferenceError: abc is not defined
	console.log("First Job : " + job);	// ReferenceError: name is not defined
	let job = "Programmer";
    console.log("Second Job : " + job);
 }
 showJob();

```
- showName의 경우 변수 name의 선언(생성) 단계와 초기화 단계를 나누고, 선언 단계에서는 그 선언이 소스코드의 어디에 위치하든 해당 스코프의 컴파일단계에서 처리해버리는 것이다. (언어 스펙상으로 변수는 렉시컬 환경이 인스턴스화되고 초기화될 때 생성된다고 한다.) 때문에 이런 선언단계가 스코프의 꼭대기로 호이스팅("끌어올림")되는 작업이라고 볼 수 있는 것이다.

- ShowJob의 경우 블록스코프인 let도 호이스팅이 된다. 그렇지만 선언 전에 참조할 경우 undefined를 반환하지 않고 ReferenceError를 발생시키는 특징이 있다.

### Closure
#### 정의
보통함수가 리턴한 함수를 클로저라고 알고있음 하지만
독립적인(자유) 변수를 참조하는 함수이다. 혹은 closure안에 선언된 함수는 선언될때 환경을 기억한다.
자바스크립트에서 클로저는 함수가 생성되는 시점에 생성된다.  
= 함수가 생성될 때 그 함수의 렉시컬 환경을 포섭(closure)하여 실행될 때 이용한다.


```javascript
function foo() {
    var color = 'blue';
    function bar() {
        console.log(color);
    }
    bar();
}
foo();

```
bar는 foo안에서 정의되고 실행되었을 뿐, foo밖으로 나오지 않았기 때문에 클로저라고 부르지 않는다.

```javascript
var color = 'red';
function foo() {
    var color = 'blue'; // 2
    function bar() {
        console.log(color); // 1
    }
    return bar;
}
var baz = foo(); // 3
baz(); // 4
```
1. bar는 color를 찾아 출력하는 함수로 정의되었다.
2. 그리고 bar는 outer environment 참조로 foo의 environment를 저장하였다.
3. bar를 global의 baz란 이름으로 데려왔다.
4. global에서 baz(=bar)를 호출했다.
5. bar는 자신의 스코프에서 color를 찾는다.
6. 없다. 자신의 outer environment 참조를 찾아간다.
7. outer environment인 foo의 스코프를 뒤진다. color를 찾았다. 값은 blue이다.
8. 때문에 당연히 blue가 출력된다.

bar는 자신이 생성된 렉시컬 스코프에서 벗어나 global에서 baz라는 이름으로 호출이 되었고, 스코프 탐색은 현재 실행 스택과 관련 없는 foo를 거쳐 갔다. baz를 bar로 초기화할 때는 이미 bar의 outer lexical environment를 foo로 결정한 이후이다. 때문에, bar의 생성과 직접적인 관련이 없는 global에서 아무리 호출하더라도 여전히 foo에서 color를 찾는 것이다. 이런 bar(또는 baz)와 같은 함수를 우리는 클로저라고 부른다.

#### 목적
- 변수 숨기기 => 외부에서 참조를 할수없도록 변수를 만들고자할때
- 반복문 변수값 
```javascript
var i;
for (i = 0; i < 10; i++) {
    setTimeout(function(){
        console.log(i);
    },100)
} // 10 10 10 10 10 10 10 10 10 10
```
해결책
```javascript
var i;
for (i = 0; i < 10; i++) {
    (function(j){
        // 선언당시 독립변수를 참조하므로 setTimeout은 j를 참조한다.
        setTimeout(function(){
            console.log(j);
        },100)
    })(i)
} // 0 1 2 3 4 5 6 7 8 9
```

### 사용시 주의점
- 메모리 관리
  - private variable을 참조하므로 메모리가 계속 필요하다.
  - 따라서 사용이 끝난 closure은 null을 할당하여 참조를 제거해준다 -> 메모리 확보
- 스코프 체인 검색 비용
  - private variable에 접근하기 위해 scope chain을 따라가야 한다.
  - 이는 시간이 필요한 작업이므로, 바로 변수에 접근하는 것에 비해 추가적인 시간이 소요된다.






