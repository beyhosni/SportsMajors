FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY document-service/target/*.jar app.jar
EXPOSE 8086
ENTRYPOINT ["java", "-jar", "app.jar"]
