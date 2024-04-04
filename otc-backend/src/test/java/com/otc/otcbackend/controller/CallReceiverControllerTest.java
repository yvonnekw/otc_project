package com.otc.otcbackend.controller;

import com.otc.otcbackend.base.TestBase;
import com.otc.otcbackend.body.CallReceiverDtoGenerator;
import com.otc.otcbackend.body.RegistrationDtoGenerator;
import com.otc.otcbackend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.junit.jupiter.Testcontainers;
import com.github.javafaker.Faker;

import static org.junit.jupiter.api.Assertions.*;
@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class CallReceiverControllerTest extends TestBase {

    private static final Logger logger = LoggerFactory.getLogger(CallReceiverControllerTest.class);

    private static final Faker faker = new Faker();
    @Autowired
    TestRestTemplate restTemplate;

    //@Autowired
    //TestDataProvider testDataProvider;

    @Autowired
    CallReceiverDtoGenerator callReceiverDtoGenerator;

    HttpHeaders headers = new HttpHeaders();

    @Autowired
    RegistrationDtoGenerator registrationDtoGenerator;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void addCallReceiverTest(){
        ResponseEntity<String> callReceiverResponse = addCallReceiver();
        assertEquals(HttpStatus.OK, callReceiverResponse.getStatusCode());
    }



}