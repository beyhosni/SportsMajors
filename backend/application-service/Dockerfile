FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY application-service/pom.xml application-service/
RUN mvn -pl application-service dependency:go-offline
COPY application-service/src application-service/src
RUN mvn -pl application-service clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/application-service/target/*.jar app.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]
