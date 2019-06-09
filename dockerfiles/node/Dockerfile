FROM ubuntu:18.04 as build-ubuntu
RUN mkdir /app
WORKDIR /app

RUN apt-get update && \
    apt-get -y install wget && \
    wget https://nodejs.org/dist/v10.9.0/node-v10.9.0.tar.gz -O /app/node-v10.9.0.tar.gz


FROM ubuntu:18.04

RUN mkdir /app
WORKDIR /app
COPY --from=build-ubuntu /app/node-v10.9.0.tar.gz /app

RUN apt-get update && \
    apt-get -y install python && \
    apt-get -y install g++ && \
    apt-get -y install make && \
    tar zxvf node-v10.9.0.tar.gz && \
    cd /app/node-v10.9.0 && \
    ./configure && \
    make && \
    make install && \
    rm -rf /app/node-* && \
    node -v





