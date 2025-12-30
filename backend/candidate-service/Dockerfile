FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY candidate-service/target/candidate-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
