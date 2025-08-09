FROM maven:3.9.4-eclipse-temurin-17-alpine AS builder

WORKDIR /app

COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw ./
COPY src ./src

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

RUN mkdir -p /app/logs

COPY --from=builder /app/target/products-0.0.1-SNAPSHOT.jar app.jar

EXPOSE $PORT

ENTRYPOINT ["java", "-jar", "app.jar"]