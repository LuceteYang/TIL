# MongoDB Intsall and Migration

### 1. MongoDB Intsall on linux(Ubuntu)
   * MongoDB Pulbic GPG Key 등록  
~~~
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
~~~

   * MongoDB 를 위한 list file 생성(우분투 버젼에 따라 명령어 선택)  
~~~
$ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
~~~

   * apt-get 을 이용하여 설치  
~~~
$ sudo apt-get update
$ sudo apt-get install -y mongodb-enterprise
~~~
   * node.js 에서 mongDB를 사용하기 위해 모듈을 설치  
~~~
$ sudo npm install -g mongojs
~~~
   * mongo 실행해보기
~~~
mongo
~~~
Start MongoDB  
~~~
sudo service mongod start
~~~
Stop MongoDB  
~~~
sudo service mongod stop
~~~
Restart MongoDB  
~~~
sudo service mongod restart
~~~
   * 방화벽 사용시 포트 열어주기
>기본 포트는 27017 이고, /etc/mongod.conf에서 bind_ip가 127.0.0.1로 되어있는데
>이것을 0.0.0.0 으로 변경해주면, 다른 공에서나 접속이 가능합니다.   
>특정 ip만 허용하고자 하신다면 bind_ip = 127.0.0.1, 12x.12x.12x.12x 와   
>같이 설정해주면 됩니다. 

### 참조 사이트 
https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/

### 2. Migration
   * 백업 받을 폴더 만들어주기 
~~~
sudo mkdir /var/backups/mongobackups
~~~
   * 백업 파일 만들기
~~~
sudo mongodump --db newdb --out /var/backups/mongobackups/`date +"%m-%d-%y"`
~~~
   * 백업 파일 적용하기
~~~
sudo mongorestore --db newdb --drop /var/backups/mongobackups/01-20-16/newdb/
~~~

### 참조 사이트  
https://www.digitalocean.com/community/tutorials/how-to-back-up-restore-and-migrate-a-mongodb-database-on-ubuntu-14-04