package com.otc.otcbackend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.otc.otcbackend.models.Call;
import com.otc.otcbackend.models.Payment;


public interface PaymentService {

    public List<Payment> getAllPayments(); 

    public Payment getPaymentById(Long paymentId);

    public Payment createPayment(Payment payment);

    public Payment updatePayment(Long paymentId, Payment paymentDetails);

    public void deletePayment(Long paymentId);

   // public List<Call> getPaidCallsByUsername(String username); 
}
