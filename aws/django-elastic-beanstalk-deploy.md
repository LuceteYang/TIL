# Django Elastic Beanstalk Deploy

## Elastic Beanstalk??
- 개발자 및 시스템 관리자에게 AWS 인프라에 대해 걱정할 필요 없이 애플리케이션을 쉽고 빠르게 배포 및 관리할 수 있는 방법을 제공
- Go, Java, .NET, Node.js, PHP, Python, Ruby,로 개발된 애플리케이션뿐만 아니라 각 언어별로 다른 플랫폼 구성을 지원


![Beanstalk Architecture](https://res.cloudinary.com/practicaldev/image/fetch/s--zxdAGP3v--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/lk4zkkbto2hzcxmt6x4g.png) 


### Elastic Beanstak 시작하기

```zsh
$ export LC_ALL="en_US.UTF-8" # option
$ pip install awsebcli
```
```zsh
$ eb init
```
input aws-access-id, aws-secret-key, python version
```zsh
$ eb create
```

check endpoint success  

에러 발생시 **`$ eb logs`** 로 확인

1. Installing packages 
EC2instance는 Amazon Linux 즉 레드헷 계열이라 yum으로 패키지를 깔수 있음  
pip install command will done  
**`./ebextensions/01_packages.config`** 생성 


2. development 환경에서는 manage.py로 실행하지만
product 환경에서는 wsgi.py에서 실행하므로 WSGIPath 설정해줘야함
.ebextensions폴더에 **`1)10_python.config`** 파일 생성후 추가  
관련 ERROR: Your WSGIPath refers to a file that does not exist.


3. requirements에 프로젝트에 필요한 모듈 이름과 버젼 환경에 맞게 기록해줘함  
루트 디렉토리에 **`requirements.txt 생성 => product requirement`** 경로 작성  
`$ pipenv lock` -r or `$ conda list `로 가상환경에 설치된 모듈 이름과 버젼 확인  
base.txt, local.txt, production.txt에 custom requirements 추가  
관련 ERROR: ModuleNotFoundError: No module named 'django'


4. environment property beanstalk에서 설정  
DJANGO_ADMIN_URL, DJANGO_AWS_ACCESS_KEY_ID, DJANGO_AWS_SECRET_ACCESS_KEY, DJANGO_AWS_STORAGE_BUCKET_NAME, DJANGO_SECRET_KEY, DJANGO_SETTINGS_MODULE, RDS_DB_HOSTNAME, RDS_DB_NAME, RDS_DB_PASSWORD, RDS_DB_PORT, RDS_DB_USERNAME  
[장고 시크릿키 생성 사이트](https://www.miniwebtool.com/django-secret-key-generator/)  
관련 ERROR: django.core.exceptions.ImproperlyConfigured: Set the DJANGO_SECRET_KEY environment variable
...


5. settings/product.py에서 SECURITY 부분, MAIL 부분 주석처리

6. database migrate
migrate 하면 wsgi.py로 이동하지않고 manage.py로 이동하여 config setting local을 실행함 그래서 config setting을 productions으로 변경해줌  
**`2)3) 10_python.config`** 에 추가



7. static 경로 설정
**`4)10_python.config`** 에 추가  
frontend/build/폴더가 .gitignore에 있는지 확인 후 깃에 추가  
react.js .env에 PUBLIC_URL 추가후 빌드  
관련 ERROR: FileNotFoundError: [Errno 2] No suce file or directory: '/opt/python/bundle/5/app/frontend/build/static'


8. Create the Admin User  
users/management/commands/ebuser.py에 superuser내용 기록후 **`5)10_python.config`** 에 추가후 지우기

9. beanstalk 헤더 차단 whitelist 추가  
.ebextensions/wsgi.conf에 생성후 **`6)10_python.config`** 에 추가



01_packages.config 
```yaml
packages:
  yum:
    git: []
    postgresql93-devel: []
```
10_python.config

```yaml
container_commands:
  01_migrate:	# 2) Handling database migrations
    command: "source /opt/python/run/venv/bin/activate && python manage.py migrate --noinput"
    leader_only: True	# Only run this command on the first instance when deploying to multiple instances
  02_collectstatic:	# 4) static 파일들을 옮겨서 모아줌
    command: "source /opt/python/run/venv/bin/activate && python manage.py collectstatic --noinput"
  03_createuser:	# 5)
    command: 'source /opt/python/run/venv/bin/activate && python manage.py ebuser'
  03_wsgireplace:	# 6) wsgi.conf 교체하여 내용수정
    command: 'cp .ebextensions/wsgi.conf ../wsgi.conf'
option_settings:
  "aws:elasticbeanstalk:application:environment":	# 3) 
    DJANGO_SETTINGS_MODULE: "config.settings.production"
  "aws:elasticbeanstalk:container:python":	# 1)
    WSGIPath: "config/wsgi.py"
```
wsgi.conf
```yaml
<VirtualHost *:80>

WSGIPassAuthorization On	# 이것만 추가해줌것임 나머지 기본내용 authorization 헤더에 추가 허용

WSGIScriptAlias / /opt/python/current/app/config/wsgi.py


<Directory /opt/python/current/app/>
  Require all granted
</Directory>

</VirtualHost>
```

### 관련 프로젝트
[https://github.com/LuceteYang/yangram](https://github.com/LuceteYang/yangram)


### 참고
[https://github.com/realpython/realpython-blog/blob/master/2015/2015-01-22-deploying-a-django-app-to-aws-elastic-beanstalk.markdown](https://github.com/realpython/realpython-blog/blob/master/2015/2015-01-22-deploying-a-django-app-to-aws-elastic-beanstalk.markdown)
