FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY identity-service/pom.xml identity-service/
RUN mvn -pl identity-service dependency:go-offline
COPY identity-service/src identity-service/src
RUN mvn -pl identity-service clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/identity-service/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
