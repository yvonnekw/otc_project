package com.otc.otcbackend.services;

import com.otc.otcbackend.dto.RegistrationDto;
import com.otc.otcbackend.exception.EmailAlreadyTakenException;
import com.otc.otcbackend.exception.UserDoesNotExistException;
import com.otc.otcbackend.models.Role;
import com.otc.otcbackend.models.Users;
import com.otc.otcbackend.repository.RoleRepository;
import com.otc.otcbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

   // @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //@Autowired
    public Users registerUser(RegistrationDto registrationDTO) {
         
        Users user = new Users();
    
        user.setFirstName(registrationDTO.getFirstName());
        user.setLastName(registrationDTO.getLastName());
        user.setEmailAddress(registrationDTO.getEmailAdress());
        user.setTelephone(registrationDTO.getTelephone());
        //user.setPassword(registrationDTO.getPassword());
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));

      // ApplicationUser encryptPassword = setPassword(registrationDTO.getLastName(), registrationDTO.getPassword());

       // applicationUser.setPassword(encryptPassword.toString());


        String name = user.getFirstName() + user.getLastName();
        boolean nameTaken = true;
        String tempName = " ";

        while(nameTaken) {
            tempName = generateUserName(name);
            
            if(userRepository.findByUsername(tempName).isEmpty()){
                nameTaken = false;
            }
        }
        user.setUsername(tempName);

        Set<Role> roles = registrationDTO.getAuthorities();
        roles.add(roleRepository.findByAuthority("USER").get());
        registrationDTO.setAuthorities(roles);

        //Set<Role> roles =  (Set<Role>) applicationUser.getAuthorities();
       // roles.add(roleRepository.findByAuthority("USER").get());
        //applicationUser.setAuthorities(roles);

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    private String generateUserName(String name) {
        long generatedNumber = (long) Math.floor(Math.random() * 1_000_000_000);
        return name + generatedNumber;
    }

    public void generateEmailVerification(String username) {
        Users user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        user.setVerification(generatedVerificationNumber());
        userRepository.save(user);
    }

   public Users setPassword(String username, String password) {
     Users user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
      String encodedPassword = passwordEncoder.encode(password);
      user.setPassword(encodedPassword);
         return userRepository.save(user);
    }

   private Long generatedVerificationNumber() {
         long generatedNumber = (long)Math.floor(Math.random() * 100_000_000);
         return  generatedNumber;
    }

    public Users getUserByUsername(String userName) {
        return userRepository.findByUsername(userName).orElseThrow(UserDoesNotExistException::new);
    }

    public Users updateUser(Users user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public Users getUserById(long userId) {
        return userRepository.findById(userId).orElseThrow(UserDoesNotExistException::new);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Users updateUser(Long userId, Users updatedUser){

        Users user = userRepository.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("Call not found with the given Id : " + userId)
        );
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());

        Users updatedUserObj = userRepository.save(user);
       return updatedUserObj;

    }

    public void deleteUser(Long userId) {
        Users user = userRepository.findById(userId).orElseThrow(
            () -> new ResourceNotFoundException("User not found with the given Id : " + userId)
        );

        userRepository.deleteById(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found "));

        Set<GrantedAuthority> authorities = user.getAuthorities()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getAuthority()))
                .collect(Collectors.toSet());

        UserDetails userDetails = new User(user.getUsername(), user.getPassword(), authorities);

        return userDetails;
    }
    /* 
       public List<String> getPhoneNumbersForUser(String username) {
        Optional<Users> user = userRepository.findByUsername(username);
        if (user != null) {
            // Assuming user contains a list of phone numbers
            return user.getReceiver();
        } else {
            throw new NotFoundException();
        }
    }*/

    public String getUsername(String username) {
        // Retrieve the user entity from the database
        Optional<Users> user = userRepository.findByUsername(username);

        // Check if the user exists
        if (user != null) {
            return user.get().getUsername();
        } else {
            // Handle case where user does not exist
            throw new UserDoesNotExistException();
        }
    }


}
