# django

### MTV?  
기존 MVC와 비교할때
- Model 데이터  => Model
- Template 템플릿    => View
- View 모델에 있는 데이터를 유저가 원하는 형태로 만들어서 보내줌    => Controller


### Architecture  
![django Architecture](https://selo77.github.io/2016/08/01/what-is-django/jumpstart-django-42-728.jpg)

- URL Dispatcher => URL 분석
- WSGI webserver와 장고를 결합해 주는 게이트웨이
- URL RESOLUTION urls.py  
- VIEW views.py  
- MODEL models.py
- TEMPLATE example.html
- FORM forms.py  


### 프로젝트  project
하나의 웹 사이트

#### manage.py
프로젝트 관리 명령어 모음  
- startapp - 앱 생성
- runserver - 서버 실행
- createsuperuser - 관리자 생성
- makemigrations app - app의 모델 변경 사항 체크
- migrate - 변경 사항을 DB에 반영
- shell - 쉘을 통해 데이터를 확인
- collectstatic - static 파일을 한곳에 모음

#### __init__.py
아무것도 들어 있지 않은 빈 파일이며 파이썬 에게 현재 디렉터리가 파이썬 패키지임을 알려 줍니다.

#### setting.py
전체 프로젝트 관리하는 설정  
- DEBUG 디버그 모드 설정
- INSTALLED_APPS pip로 설치한 앱 또는 본인이 만든 app을 추가
- MIDDLEWARE_CLASSES request와 response 사이의 주요 기능 레이어
- TEMPLATES django template 관련 설정, 실제 (html, 변수)
- DATABASES 데이터베이스 엔진의 연결 설정
- STATIC_URL 정적 파일의 URL(css, js, img)

#### urls.py
장고 프로젝트 안의 URL을 선언하는 곳 입니다.

#### wsgi.py
WSGI 프로토콜을 사용하는 웹서버가 프로젝트의 페이지를 보여주기 위하여 가장 먼저 사용하는 파일 입니다. 

#### app
기능들을 app 으로 관리  
ex) 블로그, 게시판 등  
- admin.py 관리자 권한 가지는 유저가 보는 페이지
- views.py 데이터를 적절하게 가공
- migrations

#### 환경 세팅
```zsh
$ sudo apt install python3.6-venv	# 파이썬 설치
$ python3.6 -mvenv myvenv			# 가상환경 설정
$ source myvenv/bin/activate		# 가상환경 사용하기
(myvenv) ~$ python3 -m pip install --upgrade pip
$ pip install -U Django 			# 장고 설치
$ python -m django --version	
$ . myvenv/bin/activate 			# 가상환경 사용하기
```

#### 프로젝트 세팅
1. django-admin
```zsh

$ django-admin startproject mysite .    # 프로젝트 생성

$ ./manage.py startapp blog             # app 생성

$ ./manage.py startapp migrate 

# mysite/settings.py
TIME_ZONE = 'Asia/Seoul'
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog', 	# 추가해주기
]
DATABASES	# 데이터베이스 설정하기
LOGGING		# 로깅 설정하기

$ ./manage.py createsuperuser   # admin 유저 설정

$ ./manage.py makemigrations blog   # 장고에게 새로 추가한 파일이나 변경된 파일이 있음을 알려주고, 변경된 내용을 migration 파일로써 저장하도록 합니다.

$ ./manage.py migrate   # 실행되지 않은 모든 마이그레이션을 적용합니다.

$ ./manage.py runserver 8080 # 기본 8000

$ python manage.py test blog # 테스트 진행시


```
2. Cookiecutter
```zsh
$ cookiecutter https://github.com/pydanny/cookiecutter-django
# ex) postgresql 9.6.1, Asia/Seoul
```

```zsh
pipenv --three
pipenv shell
pipenv install -r requirements/local.txt
# or
conda activate test
pip install -r requirements/local.txt
```
#### python manage.py migrate시 에러 
django.db.migrations.exceptions.InconsistentMigrationHistory  
https://stackoverflow.com/questions/44651760/django-db-migrations-exceptions-inconsistentmigrationhistory



#### 상용 서버 적용 전 장고 설정 변경
```zsh
# 환경 변수 파일 (SECRET_KEY)
# settings.py
DEBUG = False
ALLOWED_HOSTS =['127.0.0.1', '.pythonanywhere.com'] # 배포 도메인 추가
# STATIC_ROOT와 STATIC_URL
# STATIC_ROOT = os.path.join(BASE_DIR, "www_static")
$ python manage.py collectstatic
# 데이터베이스
$ python manage.py createsuperuser
DATABASES = {
	'NAME': os.path.join(BASE_DIR, 'db/db.sqlite3'),	# 기존 'db.sqlite3'에서 변경
}
$ cd /home/shkim/pykim/pyBook/ch6
$ mkdir db
$ mv db.sqlite3 db/
$ chmod 777 db/
$ chmod 666 db/db.sqlite3


$ chmod 777 logs
$ chmod 666 logs/logfile

# 개발용 runserver - 실행 시 지정
$ python manage.py runserver -settings=mysite.dev_setting

```

#### nginx, wsgi 개념
![django 배포 서버 구성](./images/H9JNiKu.png)
##### 1. 클라이언트
웹서버(Nginx)로 HTTP 요청
##### 2. 웹서버(Nginx)
웹 서버. 클라이언트로부터의 HTTP요청을 받아 정적인 페이지/파일을 돌려준다. (동적인 부분은 uWSGI가 담당) 가벼움과 높은 성능을 목표로 한다. 웹 서버, 리버스 프록시 및 메일 프록시 기능을 가진다.
##### 3. Unix Socket
웹서버(Nginx) - 웹어플리케이션서버(uWSGI) 사이의 통신을 매개 HTTP 요청을 사용할 수도 있지만 서버 안쪽에서의 통신이기 때문에 socket 방식이 overhead가 적어서 더 효율이 좋음
##### 4. 웹어플리케이션서버(uWSGI)
웹 서버(Nginx)와 웹 애플리케이션(Django)간의 연결을 중계 (Nginx에서 받은 요청을 Django에서 처리하기 위한 중계인 역할을 해준다) Nginx는 Python을 모르기 때문에 uWSGI는 HTTP 요청을 python으로, Django로 부터 받은 응답을 Nginx가 알 수 있도록 변환해준다.
##### 5. Django
웹 애플리케이션. 웹 요청에 대해 동적데이터를 돌려준다.

##### WSGI (Web Server Gateway Interface)
파이썬에서 웹 서버와 웹 애플리케이션간의 동작을 중계해주는 인터페이스 표준 웹클라이언트의 HTTP 프로토콜 요청을 Python Call로 변환하기 위한 매핑관계로 WSGI를 표준으로 사용 uWSGI는 WSGI 표준의 구현

#### 배포
1. 내장 모드로 실행
```python
# vi /etc/httpd/conf/httpd.conf

WSGIScriptAlias / /path/to/mysite.com/mysite/wsgi.py 	# 루트(/) URL로 시작하는 요청은 wsgi.py 파일에서 정의된 WSGI application에서 처리한다는 의미
WSGIPythonHome /path/to/venv
WSGIPythonPath /path/to/mysite.com 						# 파이썬 import 경로
# 아파치가 wsgi.py 파일 액세스할수 있도록 접근권한 설정
<Directory /path/to/mysite.com/mysite>
<Files wsgi.py>
Require all granted
</Files>
</Directory>
# static 파일 위치 매핑 접근권한 설정
Alias /static/ /path/to/mysite.com/mysite/www_static	
<Directory /path/to/mysite.com/mysite/www_static>
Require all granted
</Directory>

# sentenforce permissive

# service httpd start 

```
2. 데몬 모드로 실행하는 경우
```python
# vi /etc/httpd/conf/httpd.conf

WSGIScriptAlias / /path/to/mysite.com/mysite/wsgi.py 	# 루트(/) URL로 시작하는 요청은 wsgi.py 파일에서 정의된 WSGI application에서 처리한다는 의미
WSGIDaemonProcess mysite python-home=/path/to/venv python-path=/path/to/mysite.com 	# 데몬 프로세스에서 장고 실행하기 위해 프로세스 속성 설정
WSGIProcessGroup mysite	# 프로세스 그룹 지정
# 아파치가 wsgi.py 파일 액세스할수 있도록 접근권한 설정
<Directory /path/to/mysite.com/mysite>
<Files wsgi.py>
Require all granted
</Files>
</Directory>
# static 파일 위치 매핑 접근권한 설정
Alias /static/ /path/to/mysite.com/mysite/www_static	
<Directory /path/to/mysite.com/mysite/www_static>
Require all granted
</Directory>

# sentenforce permissive

# service httpd start 

```
3. [헤로쿠로 배포](https://tutorial-extensions.djangogirls.org/ko/heroku/)
4. [PythonAnywhere 배포](https://tutorial-extensions.djangogirls.org/ko/manual_pythonanywhere_deploy/)
5. [AWS BeansTalk 배포](https://github.com/LuceteYang/yangram)
어플리케이션 배포하고, 클라우드에 푸쉬하는것을 쉽게 도와줌  
rds, ec2, s3 세팅을 자동으로해줌
6. [Docker 배포](https://github.com/LuceteYang/django-docker-deploy)
docker(python, nginx, gunicorn) deploy  
rds, ec2, s3 세팅을 자동으로해줌

#### 모델을 변경하기 위한 3가지 스텝만을 기억하여 주십시오.
- 모델 변경 (models.py).
- python manage.py makemigrations 를 실행하여 변경 사항에 대한 마이그레이션 파일 생성
- python manage.py migrate 를 실행하여 변경 내용을 데이터베이스에 적용

#### 관리자페이지 customizing 관련 document
https://docs.djangoproject.com/ko/2.0/intro/tutorial07/

#### postgresql 세팅
https://tutorial-extensions.djangogirls.org/ko/optional_postgresql_installation/

#### db 내 데이터 다 지우기
python manage.py flush

#### custom template filter
https://docs.djangoproject.com/en/dev/howto/custom-template-tags/

#### humanize 적용
https://simpleisbetterthancomplex.com/tips/2016/05/09/django-tip-2-humanize.html 

#### DB에 timezone utc 시간이 저장되는경우

```python
# setting.py
USE_TZ = False
```


