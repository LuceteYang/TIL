FROM centos:7

WORKDIR /tmp
#install the dependencies
RUN yum -y install gcc-c++ && yum -y install findutils

RUN yum -y install tar

RUN yum -y install gzip

RUN touch ~/.bashrc && chmod +x ~/.bashrc

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

RUN source ~/.bashrc && nvm install 8.10

WORKDIR /build