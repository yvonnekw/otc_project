# Base image
FROM openjdk:19

# Set working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/otc-backend-0.0.1-SNAPSHOT.jar /app/otc.jar

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["java", "-jar", "otc.jar"]