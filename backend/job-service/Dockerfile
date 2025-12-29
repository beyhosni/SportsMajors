FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY job-service/pom.xml job-service/
RUN mvn -pl job-service dependency:go-offline
COPY job-service/src job-service/src
RUN mvn -pl job-service clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/job-service/target/*.jar app.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "app.jar"]
