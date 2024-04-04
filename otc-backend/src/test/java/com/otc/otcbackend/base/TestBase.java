package com.otc.otcbackend.base;

import com.github.javafaker.Faker;
import com.otc.otcbackend.body.RegistrationDtoGenerator;

import com.otc.otcbackend.dto.RegistrationDto;
import com.otc.otcbackend.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.JsonNode;
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper;

import java.util.LinkedHashMap;

public class TestBase {

    @Autowired
    TestRestTemplate restTemplate;

    HttpHeaders headers = new HttpHeaders();

    @Autowired
    RegistrationDtoGenerator registrationDtoGenerator;
    @Autowired
    private RoleRepository roleRepository;

    private static final Logger logger = LoggerFactory.getLogger(TestBase.class);

    private static final Faker faker = new Faker();


    protected ResponseEntity<String> registerUser(RegistrationDto registrationDto, HttpHeaders headers) {
        HttpEntity<RegistrationDto> registrationEntity = new HttpEntity<>(registrationDto, headers);
        ResponseEntity<String> registrationResponse = restTemplate.exchange("/auth/register", HttpMethod.POST, registrationEntity, String.class);
        return registrationResponse;
    }

    protected String extractUsernameFromRegistrationResponse(String registrationResponseBody) {
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

    protected String extractTokenFromLoginResponse(String loginResponseBody) {
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

    protected String loginUserAndGetToken(String username, String password) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        LinkedHashMap<String, String> loginBody = new LinkedHashMap<>();
        loginBody.put("username", username);
        loginBody.put("password", password);

        HttpEntity<LinkedHashMap<String, String>> loginEntity = new HttpEntity<>(loginBody, headers);
        ResponseEntity<String> loginResponse = restTemplate.exchange("/auth/login", HttpMethod.POST, loginEntity, String.class);

        return extractTokenFromLoginResponse(loginResponse.getBody());
    }

    protected ResponseEntity<String> addCallReceiver(){
        headers.setContentType(MediaType.APPLICATION_JSON);
        RegistrationDto registrationDto = registrationDtoGenerator.generateRandomRegistrationDto();
        ResponseEntity<String> response = registerUser(registrationDto, headers);
        String actualResults = response.getBody();
        logger.info("actual result " + actualResults);
        String username = extractUsernameFromRegistrationResponse(actualResults);

        String loginResponse = loginUserAndGetToken(username, registrationDto.getPassword());

        logger.info("actual result login " + loginResponse);

        String telephone = faker.phoneNumber().cellPhone();

        String requestBody = "{\"telephone\": \"" + telephone + "\", \"username\": \"" + username + "\"}";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> calReceiverResponse = restTemplate.exchange("/call-receiver/add/receiver", HttpMethod.POST, requestEntity, String.class);

        logger.info("call receiver details " + calReceiverResponse);

        return calReceiverResponse;
    }
}
