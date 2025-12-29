FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY document-service/pom.xml document-service/
RUN mvn -pl document-service dependency:go-offline
COPY document-service/src document-service/src
RUN mvn -pl document-service clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/document-service/target/*.jar app.jar
EXPOSE 8086
ENTRYPOINT ["java", "-jar", "app.jar"]
