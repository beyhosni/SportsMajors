FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY employer-service/pom.xml employer-service/
RUN mvn -pl employer-service dependency:go-offline
COPY employer-service/src employer-service/src
RUN mvn -pl employer-service clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/employer-service/target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
