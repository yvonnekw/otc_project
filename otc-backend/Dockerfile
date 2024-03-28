# Base image
FROM openjdk:17

# Set working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/otc-0.1.1-SNAPSHOT.jar /app/otc.jar

# Expose port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "otc.jar"]