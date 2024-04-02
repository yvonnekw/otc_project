package com.otc.otcbackend.body;

import com.github.javafaker.Faker;
import com.otc.otcbackend.dto.RegistrationDto;
import com.otc.otcbackend.models.Role;
import com.otc.otcbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class TestDataProvider {

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
