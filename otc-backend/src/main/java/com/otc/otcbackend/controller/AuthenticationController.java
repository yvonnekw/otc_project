package com.otc.otcbackend.controller;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.otc.otcbackend.dto.LoginResponseDto;
import com.otc.otcbackend.dto.RegistrationDto;
import com.otc.otcbackend.exception.EmailAlreadyTakenException;
import com.otc.otcbackend.exception.UserDoesNotExistException;
import com.otc.otcbackend.models.Users;
import com.otc.otcbackend.publisher.RabbitMQJsonProducer;
import com.otc.otcbackend.services.AuthenticationService;
import com.otc.otcbackend.services.TokenService;
import com.otc.otcbackend.services.UserService;

import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    private final UserService userService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private RabbitMQJsonProducer rabbitMQJsonProducer;

    @Autowired
    private AuthenticationService authenticationService;

   @Autowired
    public AuthenticationController(UserService userService, TokenService tokenService, AuthenticationManager authenticationManager, RabbitMQJsonProducer rabbitMQJsonProducer){
        this.userService = userService;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.rabbitMQJsonProducer = rabbitMQJsonProducer;
    }

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken(){
        return new ResponseEntity<String>("The email you provided isa already taken", HttpStatus.CONFLICT);

    }
     
    /* 
    @PostMapping("/register")
    public ApplicationUser registerUser(@RequestBody RegistrationDto body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword(), body.getEmailAddress(), body.getMainTelephone());
    }*/
    

    @PostMapping("/register")
    public Users registerUser(@RequestBody RegistrationDto body) {
        rabbitMQJsonProducer.sendJsonMessage(body);
        return userService.registerUser(body);
    }

    
    @PostMapping("/login")
    public LoginResponseDto loginUser(@RequestBody LinkedHashMap<String, String> body){
        String username = body.get("username");
        String password = body.get("password");

        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

                String token = tokenService.generateJwt(auth);
                return new LoginResponseDto(userService.getUserByUsername(username), token);

         } catch(RuntimeException e) {  //(AuthenticationException e) {
            return new LoginResponseDto(null, "");
        }

        }
        //return authenticationService.loginUser(body.getUsername(), body.getPassword());

/* 
    @PostMapping("/login")
    public ApplicationUser login(@RequestBody LinkedHashMap<String, String> body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword());
    }*/

    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesNotExist(){
        return new ResponseEntity<String>("The user you are looking for does not exist.", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/telephone")
    public Users updateTelephoneNumber(@RequestBody LinkedHashMap<String, String> body){

        String userName = body.get("username");
        String phone = body.get("mainTelephone");
    
        Users applicationUser = userService.getUserByUsername(userName);

        applicationUser.setTelephone((phone));

        return userService.updateUser(applicationUser);
    }

    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String, String> body) {

        userService.generateEmailVerification(body.get("username"));

        return new ResponseEntity<String>("Verification code generated, email sent.", HttpStatus.OK);

    }

    @PutMapping("/update/password")
    public Users updatePassword(@RequestBody LinkedHashMap<String, String> body) {

        String username = body.get("username");
        String password = body.get("password");

        return userService.setPassword(username, password);

    }
    
    @GetMapping("/username")
    public ResponseEntity<String> getUsername(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        String username = authentication.getName();
        return ResponseEntity.ok(username);
    }
}


