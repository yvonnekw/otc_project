package com.otc.otcbackend;

import java.util.HashSet;
import java.util.Set;



import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.otc.otcbackend.models.Role;
import com.otc.otcbackend.models.Users;
import com.otc.otcbackend.repository.RoleRepository;
import com.otc.otcbackend.repository.UserRepository;

@SpringBootApplication
public class OtcBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OtcBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			Role role = roleRepository.save(new Role(1, "USER"));
			Role role2 = roleRepository.save(new Role(2, "ADMIN"));

			Set<Role> roles = new HashSet<>();
			Set<Role> roles2 = new HashSet<>();

			roles.add(role);
			roles2.add(role2);

			Users callerUser = new Users();
			callerUser.setAuthorities(roles);
			callerUser.setFirstName("Yodal");
			callerUser.setLastName("Pinky");
			callerUser.setEmailAddress("yodal@email.com");
			callerUser.setUsername("yodalpinky1");
			//callerUser.setPassword("password");
			callerUser.setPassword(passwordEncoder.encode("password"));
			callerUser.setEnabled(true);

			userRepository.save(callerUser);

			Users callerUser2 = new Users();
			callerUser2.setAuthorities(roles2);
			callerUser2.setFirstName("Admin");
			callerUser2.setLastName("Smith");
			callerUser2.setEmailAddress("yodal@email.com");
			callerUser2.setUsername("adminSmith");
			// callerUser.setPassword("password");
			callerUser2.setPassword(passwordEncoder.encode("password1"));
			callerUser2.setEnabled(true);

			userRepository.save(callerUser2);
		};
	}


}
