# Clean Code
개발자의 공유와 피드백 => 코드리뷰로
깨끗한 코드는 잘 쓴 문장처럼 읽힌다.  
서술적으로 문장처럼 읽힌다.  
작성자가 아닌 사람도 읽기 쉽고 고치기 쉽다.

### 의미있는 이름 (의도를 분명하게 밝혀라)
```ts
// 비어있는 값들을 없애는 함수
// 무의미한 값을 지운다는것
const clearEmptyKey = (data:{}): {} =>
	Map(data).filter((item: {}) => item !== undefined && item !== null).toObject();
// clear는 싹 지워버린다는 의미인것 같아.
// => compact 추상화레벨이 높다.
// => compact 뒤에 뭘 지워주는지 적자
const compactObject = (data:{}): {} =>
	Map(data).filter((item: {}) => item !== undefined && item !== null).toObject();

const compactString = (value: string): {} =>
	value.replact(/ /g,'');

```
의미있는 이름은 의도를 분명히 드러낸다 => 팀을 소통하게 만든다.

### 함수
프로그래밍은 여느 글짓기와 비슷하다
```jsx
{
	tag &&
	<span className = { tagClassName }>
		{ tag }
	</span>
}
// 좀더 명시적으로 써주는게 어떨지
{
	// boolean으로 체크하고 있다는것을 드러냄
	// 하지만 tag는 있는지 없는지 체크하는 것임
	!!tag &&
	<span className = { tagClassName }>
		{ tag }
	</span>
}
// optional로하는게 좋을것 같다.
{
	optinal(tag, it =>(
	<span className = { tagClassName }>
		{ it }
	</span>
	))
}
```
=> 서술적으로 표현이 된다. 함수는 문장으로 표현하는데 좋은 도구가 된다.

### 주석
주석을 쓰기 시작하면 코드의 가독성이 떨어진다
주석 대신 코드로 이야기하자

### 오류 처리
논리와 오류코드를 섞지마라  
논리와 로깅 코드를 뒤섞지 마라  
논리를 보호하라 즉 비지니스 로직에 집중할 수 있게 하라  
```javascript
const has_class_all = has_class(currentTarget, classname='all');
let filter_name;
if (has_class_all){
	const only_prime = loan => loan.is_prime;
	const filtered_loans = current.loans.filter(only_prime);
	filter_name = "only_prime"; // log를 찍기위해 filter 상태를 받아옴 
	set_state( new_state { loans: filtered_loans});
}else{
	const by_sorting_criteria = compare_functions[current.sort_by];
	const sorted_loans = loans.sort(by_sorting_criteria);
	filter_name = "all";	// log를 찍기위해 filter 상태를 받아옴 
	set_state( new_state { loans: sorted_loans});
}

event_log(data:{
	screen_name: 'loans_page',
	filter_name: filter_name,
	event_name: 'click_filter',
	version: '1.0.0'
})
render(current.loans);
toggle_class(currentTarget, class_name = 'all');
```
비지니스 로직에 방해가 되고 이해하는데 어려워짐  
논리와 로깅코드를 섞지말자  

개선된코드  
```javascript
const has_class_all = has_class(currentTarget, classname='all');
if (has_class_all){
	const only_prime = loan => loan.is_prime;
	const filtered_loans = current.loans.filter(only_prime);
	set_state( new_state { loans: filtered_loans});
}else{
	const by_sorting_criteria = compare_functions[current.sort_by];
	const sorted_loans = loans.sort(by_sorting_criteria);
	set_state( new_state { loans: sorted_loans});
}

track_event(current.loans, has_class_all);
render(current.loans);
toggle_class(currentTarget, class_name = 'all');

const track_event = (loans, has_class_all)=>{
	const filter_name = has_class_all ? 'only_prime' : "all";
	event_log(data:{
		screen_name: 'loans_page',
		filter_name: filter_name,
		event_name: 'click_filter',
		version: '1.0.0'
	})
}
```

### 프로그래밍 제약사항
1. 컨텐션을 지키면서 프로그래밍한다.

2. indent(인텐트, 들여쓰기) depth를 2를 넘지 않도록 구현한다. 

3. 함수는 한 가지 일만 하도록 최대한 작게 만들어라
4. 길이가 10라인을 넘어가지 않도록 구현한다.
5. 인자 수를 3개까지만 허용한다.

6. else 예약어를 쓰지 않는다.

7. git commit 메시지에 해당 commit에서 작업한 내용에 대한 이해가 가능하도록 작성한다.  
ex) [수정] 영화가 매진되었는지 확인하는 기능  
ex) [추가] 영화가 매진되었는지 확인하는 기능  
ex) feat: 예약할 인원을 묻는 기능 구현  
ex) docs: README.md(기능 구현 목록)작성  
ex) refactor: 오타 수정  


### TDD.리팩토링
평생동안 연습하겠다는 마음가짐으로 시작  
장난감 프로젝트로 연습  
Test-Driven Development(TDD)는 매우 짧은 개발 사이클의 반복에 의존하는 소프트웨어 개발 프로세스이다. 
우선 개발자는 요구되는 새로운 기능에 대한 자동화된 테스트케이스를 작성하고 해당 테스트를 통과하는 가장 간단한 코드를 작성한다. 
일단 테스트 통과하는 코드를 작성하고 상황에 맞게 리팩토링하는 과정을 거치는 것이다. 말 그대로 테스트가 코드 작성을 주도하는 개발방식


### 객체지향 생활체조 원칙
1. 한 메서드에 오직 한 단계의 들여쓰기만 한다.
2. else 예약어를 쓰지 않는다.
3. 모든 원시값과 문자열을 포장한다.
4. 한줄에 점을 하나만 찍는다.
5. 줄여쓰지 않는다.
6. 모든 엔티티를 작게 유짛나다.
7. 3개 이상의 인스턴스 변수를 가진 클래스를 쓰지 않는다.
8. 일급 콜렉션을 쓴다.
9. 게터/세터/프로퍼티를 쓰지 않는다.
-소트웍스 앤솔리지-


### Reference
#### [우아한테크세미나] 0425 TDD 리팩토링 - 자바지기 박재성님 강의
https://www.youtube.com/watch?v=bIeqAlmNRrA&feature=youtu.be
#### [콘샐러드3 EP.3] 담대한 협업과 클린코드_ Front-end 개발자 하조은
https://www.youtube.com/watch?v=wPhT5jbKys4&t=597s
#### 클린코드 도서

