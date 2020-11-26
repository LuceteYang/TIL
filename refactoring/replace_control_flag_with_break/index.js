function someFunction(){
  const people = ["아이언맨", "캡틴아메리카", "조커", "울버린", "스파이더맨", "사루만"];
  // 생략(중요하지 않은 코드)
  checkForMiscreants(people);
  // 생략
}

function checkForMiscreants(people) {
  if (people.some(p => ["조커", "사루만"].includes(p))) sendAlert();
  if(!["조커","사루만"].isDisjointWith(people)) sendAlert(); // swift 제공
}