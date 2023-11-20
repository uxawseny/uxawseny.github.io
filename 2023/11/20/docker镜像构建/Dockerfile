FROM openjdk:8-alpine

MAINTAINER Blue 903690939@qq.com

ADD target/*.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "/app.jar"]