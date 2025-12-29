FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY candidate-service/pom.xml candidate-service/
RUN mvn -pl candidate-service dependency:go-offline
COPY candidate-service/src candidate-service/src
RUN mvn -pl candidate-service clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/candidate-service/target/*.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
