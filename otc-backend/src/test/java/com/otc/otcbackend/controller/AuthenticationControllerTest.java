package com.otc.otcbackend.controller;

import com.otc.otcbackend.body.TestDataProvider;
import com.otc.otcbackend.dto.RegistrationDto;
import com.otc.otcbackend.models.Role;
import com.otc.otcbackend.models.Users;
import com.otc.otcbackend.repository.RoleRepository;
import com.otc.otcbackend.services.PaymentServiceImpl;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.JsonNode;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.LinkedHashMap;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class AuthenticationControllerTest {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationControllerTest.class);
/*
    @Container
    public DockerComposeContainer<?> environment =
            new DockerComposeContainer<>(new File(System.getProperty("user.dir")+"/docker-compose.yml"))
                    .withLocalCompose(true);*/
    @Autowired
    TestRestTemplate restTemplate;

    HttpHeaders headers = new HttpHeaders();

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    TestDataProvider testDataProvider;

    @Test
    public void registerUserTest(){
        RegistrationDto registrationDto = testDataProvider.generateRandomRegistrationDto();
        HttpEntity<RegistrationDto> entity = new HttpEntity<>(registrationDto, headers);
        ResponseEntity<String> response = restTemplate.exchange("/auth/register", HttpMethod.POST, entity, String.class);
        String actualResults = response.getBody();
        logger.info("actual result " + actualResults);

       assertNotNull(actualResults);
       assertTrue(actualResults.contains("Georgina"));
    }

    @Test
    public void userLoginTest(){
        RegistrationDto registrationDto = testDataProvider.generateRandomRegistrationDto();
        HttpEntity<RegistrationDto> registrationEntity = new HttpEntity<>(registrationDto, headers);
        ResponseEntity<String> registrationResponse = restTemplate.exchange("/auth/register", HttpMethod.POST, registrationEntity, String.class);

        assertEquals(HttpStatus.OK, registrationResponse.getStatusCode());

        String registrationResponseBody = registrationResponse.getBody();
        assertNotNull(registrationResponseBody);
        String username = extractUsernameFromRegistrationResponse(registrationResponseBody);


        LinkedHashMap<String, String> loginBody = new LinkedHashMap<>();
        loginBody.put("username", username);
        loginBody.put("password", registrationDto.getPassword());
        HttpEntity<LinkedHashMap<String, String>> loginEntity = new HttpEntity<>(loginBody, headers);
        ResponseEntity<String> loginResponse = restTemplate.exchange("/auth/login", HttpMethod.POST, loginEntity, String.class);

        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());

        String actualResults = loginResponse.getBody();
        logger.info("actual result " + actualResults);

        String loginResponseBody = loginResponse.getBody();
        assertNotNull(loginResponseBody);
        String token = extractTokenFromLoginResponse(loginResponseBody);

        assertNotNull(token);
    }

    private String extractUsernameFromRegistrationResponse(String registrationResponseBody) {
        try {
            // Create an ObjectMapper instance
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the JSON response string into a JsonNode
            JsonNode rootNode = objectMapper.readTree(registrationResponseBody);

            String extractedUsername;
            extractedUsername = rootNode.get("username").asText();

            return extractedUsername;
        } catch (Exception e) {

            e.printStackTrace();

            return null;
        }
    }

    private String extractTokenFromLoginResponse(String loginResponseBody) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode rootNode = objectMapper.readTree(loginResponseBody);

            JsonNode tokenNode = rootNode.get("token");

            if (tokenNode != null && !tokenNode.isNull()) {

                return tokenNode.asText();
            } else {

                return null;
            }
        } catch (Exception e) {

            e.printStackTrace();

            return null;
        }
    }

}