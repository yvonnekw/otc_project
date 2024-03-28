package com.otc.otcbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.otc.otcbackend.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>{

    

    
}
