# PWA
## PWA(Progressive Web App)란?
- PWA는 웹의 장점과 앱의 장점을 결합한 환경입니다. 앱과 같이 설치가 필요 없고, 느린 네트워크에서도 빠르게 로드 됩니다. 
- 관련된 푸시 알림을 전송할 수 있고 홈 화면에 아이콘을 만들 수 있으며, 앱과 같이 전체화면으로 로드할 수 있습니다.

## Chrome 개발자 도구에서 디버깅 가능
Audits탭에서 Run audits


## PWA 조건
##### 1. HTTPS 운영
운영체제의 여러 특별한 권한을 부여받기 때문에, 웹 서버와의 보안 연결은 필수다.
##### 2. Web App Manifest가 있어야 한다.
단지 사이트와 관련된 정보를 담는 제이슨JSON 파일 [참고](https://developer.mozilla.org/en-US/docs/Web/Manifest#Deploying_a_manifest_with_the_link_tag)
##### 3. 서비스 워커를 사용해야 한다
유저가 우리 website에서 벗어나도 동작하도록 도와주는 파일
웹사이트가 작동 중이지 않아도 실행되는 자바스크립트 파일
원하는 작업 유형에 맞는 제작 방법을 [참고](https://serviceworke.rs/)


오프라인 캐싱 => 해당 웹사이트로 오는 모든 경로들을 캐치하는것
```javascript
//service-worker.js
self.addEventListener("install", event => {
	//service worker가 등록되었을때 작동
  const offlinePage = new Request("/");
  event.waitUntil(
    fetch(offlinePage).then(response => {
      return caches.open("my-page").then(cache => {
      	// 서비스워커가 설치될시 루트 페이지를 요청하여 저장해줌
        return cache.put(offlinePage, response);
      });
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(error => {
    	// 네트워크가 오프라인이거나 에러날시 cache에서 저장했던 루트페이지 불러옴
      return caches.open("my-page").then(cache => cache.match("/"));
    })
  );
});
```