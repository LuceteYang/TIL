# Max Prefix Suffix Word

## 문제
단어들로 이루어진 문자, 단어 배열이 있다.
문자의 단어가 단어 배열에 포함되어있을 경우 앞에 있는 단어와 뒤에 있는 단어를 세어서 가장 많은 단어를 출력하자

## 풀이코드
```python
def maxPrefixSuffixWord(words,array):
	set_array = set(array)
	splited_strings = words.split(" ")
	results = []
	parsed_string_length = len(splited_strings)
	if parsed_string_length==0:
		return None
	if splited_strings[0] in set_array:
		results.append(splited_strings[1])
	if splited_strings[parsed_string_length-1] in set_array:
		results.append(splited_strings[parsed_string_length-2])
	for index in range(1,parsed_string_length-1):
		if splited_strings[index] in set_array:
			results.append(splited_strings[index-1])
			results.append(splited_strings[index+1])
	# print(results)
	return max(results,key=results.count)
```

## 테스트 케이스
```python
words = "array coin egg definition done egg done banana done array done definition egg done class array done definition egg"

array = ["done"]

print(maxPrefixSuffixWord(words,array))

# results => ['definition', 'egg', 'egg', 'banana', 'banana', 'array', 'array', 'definition', 'egg', 'class', 'array', 'definition']
# result  => definition

words = "class apple banana class definition dsfd set apple"

array = ["class","set"]

print(maxPrefixSuffixWord(words,array))

# results => ['apple', 'banana', 'definition', 'dsfd', 'apple']
# result  => apple
```