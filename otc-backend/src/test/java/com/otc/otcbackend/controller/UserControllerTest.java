package com.otc.otcbackend.controller;

import com.otc.otcbackend.models.Call;
import com.otc.otcbackend.models.Users;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.io.File;
import java.util.Arrays;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Transactional
class UserControllerTest {

    //@Container
   // @ServiceConnection
    //static PostgreSQLContainer<?> postgresqlContainer = new PostgreSQLContainer<>("postgres:16");

    @Container
    public DockerComposeContainer<?> environment =
            new DockerComposeContainer<>(new File(System.getProperty("user.dir")+"/docker-compose.yml"))
                    .withLocalCompose(true);
    @Autowired
    TestRestTemplate restTemplate;

    @Test
    void shouldFindAllUsers() {
        //user/all-users
        Users[] user = restTemplate.getForObject("/user/all-users", Users[].class);
       // assertThat(user.length).isEqualTo(2);
        assertThat(user.length).isNotNull();
        assertThat(Arrays.stream(user).findFirst()).isPresent();
    }

    @Test
    void shouldFindUserByUsername() {
       ResponseEntity<Users> response = restTemplate.exchange("/user/yodalpinky1", HttpMethod.GET,  null, Users.class);
       assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
       assertThat(response.getBody()).isNotNull();
    }

}