package com.otc.otcbackend.services;

import com.otc.otcbackend.dto.LoginResponseDto;
import com.otc.otcbackend.models.Users;



public interface AuthenticationService {

    public Users registerUser(String username, String password, String emailAddress, String telephone);

    public LoginResponseDto loginUser(String username, String password);

}
