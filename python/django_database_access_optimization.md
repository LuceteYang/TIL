# Django에서 DB 액세스 최적화
1. 기본적인 DB 최적화
- 인덱스 추가
filter(), exclude(), order_by() 등을 사용하여 자주 쿼리하는 필드에 인덱스를 추가하는 것이 좋습니다.
- 적절한 필드 타입 사용

2. QuerySet 이해하기

2-1. QuerySet 계산 이해하기
- QuerySet을 생성하는 행위는 데이터베이스 활동을 포함하지 않습니다. Django는 QuerySet이 계산될 때까지 실제로 쿼리를 실행하지 않습니다
- QuerySet이 계산되는 시점 => 반복 (Iteration), Slicing, Pickling(캐싱의 타이밍을 임의로 정의하는 기법) / Caching, repr(), len(), list(), bool()
- 각 QuerySet에는 데이터베이스 액세스를 최소화하기 위한 캐시가 포함되어 있습니다.
2-2. 캐시된 속성 이해하기
- ORM 객체에 대한 속성 결과 캐싱도 있습니다. 일반적으로 호출할 수 없는 속성은 캐싱됩니다. 
- callable하지 않은 속성들의 값은 캐시가 됩니다 (* callable: Python에서 괄호가 없이 불려지는 method들 - 객체의 속성들).
- 커스텀으로 생성한 property들은 cached_property 데코레이터를 사용해서 캐시되게 할 수 있음
- iterator()를 사용함으로써 캐시가 QuerySet단에서 진행되는 것을 방지할 수 있음 (결과값이 캐시가 안되는 것은 아님)
- 만약 QuerySet이 많은 데이터를 갖고 있다면 효율적인 퍼포먼스와 메모리 사용량을 iterator를 통해 확보할 수 있음

```python
>>> entry = Entry.objects.get(id=1)
>>> entry.blog   # Blog 객체가 여기서 검색된다
>>> entry.blog   # 캐시되었기 때문에 여기서는 DB 액세스가 일어나지 않는다
```
그러나 일반적으로 호출 가능한 속성은 매번 DB 조회를 발생시킵니다.  
만약 QuerySet의 일부만 연산된다면 (예를 들어 QuerySet의 slicing이나 indexing), 캐시된 값이 있는지 확인은 하지만 결과값을 새로 캐시하지 않습니다 (만약 이전에 QuerySet의 전체가 연산된 경우가 있다면 그 때 생성된 캐시값을 사용합니다).

```python
>>> entry = Entry.objects.get(id=1)
>>> entry.authors.all()   # 쿼리 실행
>>> entry.authors.all()   # 또다시 쿼리 실행
```
2-3. with 템플릿 태그 사용하기
- QuerySet의 캐싱 동작을 사용하려면 with 템플릿 태그를 사용해야 할 수도 있습니다.
- with 템플릿 태그는 복잡한 변수를 더 간단한 이름으로 저장합니다.
- 이는 비용이 많이 드는 방법 (EX. 데이터베이스를 조회하는 방법)에 여러 번 액세스 할 때 유용합니다.
2-4. iterator() 사용하기
- 객체가 많은 경우 QuerySet의 캐싱 동작으로 인해 많은 양의 메모리가 사용될 수 있습니다. 이 경우 iterator()가 도움이 될 수 있습니다. 
- 한 번 액세스 해야하는 많은 수의 객체를 반환하는 QuerySet의 경우, 성능이 향상되고 메모리가 크게 감소할 수 있습니다.
2-5. explain() 사용하기
- QuerySet.explain()은 사용된 인덱스 및 조인을 포함하여 데이터베이스에서 쿼리를 실행하는 방법에 대한 자세한 정보를 제공합니다. 
- 이러한 세부 정보는 보다 효율적으로 다시 작성할 수 있는 쿼리를 찾거나 성능을 향상시키기 위해 추가할 수있는 인덱스를 식별하는 데 도움이 될 수 있습니다.
3. Python이 아닌 데이터베이스에서 작동하는 경우
- filter() 및 exclude()를 사용하여 데이터베이스에서 필터링하는 경우
- F 표현식을 사용하여 같은 모델의 다른 필드를 기반으로 필터링하는 경우
- 데이터베이스에서 aggregation을 하기 위해 어노테이션하는 경우
- RawSQL 일부 SQL을 쿼리에 명시적으로 추가할 수 있습니다.
- 그래도 부족할 경우, 완전하게 raw SQL를 사용할 수도 있습니다.

```python
# 일반적인 연산
reporter = Reporters.objects.get(name='Tintin')
reporter.stories_filed += 1		# stories_filed 값을 DB에서 가져옴
reporter.save()

# F expression
from django.db.models import F

reporter = Reporters.objects.get(name='Tintin')
reporter.stories_filed = F('stories_filed') + 1		# DB에 stories_filed를 직접 연산시킴
reporter.save()
# 새로 연산된 값을 가져오려면
reporter = Reporters.objects.get(pk=reporter.pk)
# 혹은 더욱 간결하게
reporter.refresh_from_db()
```

4. 고유(unique)하거나 인덱스된 열을 사용한 개별 객체 검색하는 경우
- get()을 사용하여 개별 객체를 검색할 때 unique 또는 db_index 열을 사용하면 인덱스로 인해 쿼리 속도가 빨라집니다. 
- 여러 객체가 조건과 일치하면 쿼리가 훨씬 느리게 실행될 수 있습니다. 하나의 객체가 반환될 것이라고 보장하지 않습니다.

5. 필요한 항목은 즉시 검색하세요
QuerySet.select_related() 및 prefetch_related()를 사용하기
select_related는 모든 foreign key(외래키) 관계에 있는 객체들을 한번에 다 가져옵니다. 
select_related는 어느 QuerySet에서든 사용할 수 있고 (예: filter) filter와 select_related를 사용하는 순서에 관계없이 같은 방식으로 처리합니다.
```python
# DB에 접속
e = Entry.objects.get(id=5)

# 관련된 Blog 객체를 가져오기 위해 DB에 한번 더 접속
b = e.blog

# select_related을 사용
# DB에 접속
e = Entry.objects.select_related('blog').get(id=5)

# 이미 위에서 관련된 Blog객체들을 가져왔기 때문에 DB에 접속하지 않음
b = e.blog
```
prefetch_related는 select_related와 비슷하지만 select_related가 ‘1 대 1’ 관계 
(외래키나 다른 ‘1 대 1’ 관계)에서만 사용 가능하다면 prefetch_related는 ‘1 대 다’ 혹은 ‘다 대 다’에도 사용 가능합니다.



6. 필요없는 항목은 검색하지 마세요
- dict 또는 list 값을 원할 때 QuerySet.values() 및 values_list()를 사용하기
- QuerySet.defer() 및 only()를 사용하기
- QuerySet.count() 사용하기
- QuerySet.exists() 사용하기
- QuerySet.update() 및 delete()를 사용하기
- 외래 키 값 직접 사용하기
```python
# 이렇게 말고
entry.blod.id

# 이렇게 사용하세요
entry.blod_id
```
- 상관없다면 결과를 정렬하지 마세요

7. 일괄 삽입
```python
# 이 코드보다
Entry.objects.create(headline='This is a test')
Entry.objects.create(headline='This is only a test')

# 이 코드가 더 바람직하다
Entry.objects.bulk_create([
    Entry(headline='This is a test'),
    Entry(headline='This is only a test'),
])
```
이것은 ManyToManyFields에도 적용됩니다.
```python
# 이 코드보다
my_band.members.add(me)
my_band.members.add(my_friend)
# 이 코드가 더 바람직하다
my_band.members.add(me, my_friend)
```

### 참고 자료
https://blog.leop0ld.org/posts/database-access-optimization/  
https://tech.peoplefund.co.kr/2017/11/03/django-db-optimization.html