FROM openjdk:8-alpine
MAINTAINER Alexft 903690939@qq.com
ADD target/*.jar sentinel-dashboard.jar
ENV JAVA_OPTS="-Dserver.port=8080 \
-Dcsp.sentinel.dashboard.server=localhost:8080 \
-Dsentinel.dashboard.auth.username=sentinel \
-Dsentinel.dashboard.auth.password=sentinel"
ENTRYPOINT java ${JAVA_OPTS} -jar sentinel-dashboard.jar