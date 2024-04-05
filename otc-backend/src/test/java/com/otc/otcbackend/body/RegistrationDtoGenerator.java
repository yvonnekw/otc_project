package com.otc.otcbackend.body;

import com.github.javafaker.Faker;
import com.otc.otcbackend.dto.RegistrationDto;

import com.otc.otcbackend.models.Role;
import com.otc.otcbackend.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class RegistrationDtoGenerator {
    private static final Logger logger = LoggerFactory.getLogger(RegistrationDtoGenerator.class);
    private static final Faker faker = new Faker();

    @Autowired
    private RoleRepository roleRepository;



    public RegistrationDto generateRandomRegistrationDto() {
        Optional<Role> optionalUserRole = roleRepository.findByAuthority("USER");
        Role userRole = optionalUserRole.orElseThrow(() -> new RuntimeException("USER role not found"));

        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);

        return new RegistrationDto(
                "Georgina",
                faker.name().lastName(),
                faker.internet().emailAddress(),
                "pwd",
                faker.phoneNumber().cellPhone(),
                authorities
        );
    }
}
