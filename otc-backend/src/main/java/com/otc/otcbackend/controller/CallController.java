package com.otc.otcbackend.controller;

import java.util.LinkedHashMap;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.otc.otcbackend.dto.CallDto;
import com.otc.otcbackend.models.Call;
import com.otc.otcbackend.publisher.RabbitMQJsonProducer;
import com.otc.otcbackend.services.CallService;


@RestController
@RequestMapping("/calls")
@CrossOrigin("*")
public class CallController {

    //private final UserService userService;
    private final CallService callService;

    //private final InvoiceService invoiceService;
    private final RabbitMQJsonProducer rabbitMQJsonProducer;

    public CallController(CallService callService,  RabbitMQJsonProducer rabbitMQJsonProducer) {
        this.callService = callService;
        //this.userService = userService;
        this.rabbitMQJsonProducer = rabbitMQJsonProducer;
       // this.invoiceService = invoiceService;
    }

    /* 
       //build add calls
    @PostMapping//@RequestBody converts the json into a CallDto java object
    public ResponseEntity<Call> makeCall(@RequestBody LinkedHashMap<String, String> CallDto callDto){
        System.out.println("make call data " + callDto.toString());
        Call savedCall = callService.makeCall(callDto);
        return new ResponseEntity<>(savedCall, HttpStatus.CREATED);
    }*/

    @GetMapping("{id}") //url method argument is band with the Path variable if to the callId
    public ResponseEntity<Call> getCallById(@PathVariable("id") long callId) {
        Call call = callService.getCallById(callId);
        return ResponseEntity.ok(call);
    }

    @GetMapping("/get-all-calls")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Call>> getAllCalls() {
        List<Call> calls = callService.getAllCalls();
        return ResponseEntity.ok(calls);
    }

    @PutMapping("{id}")
    public ResponseEntity<Call> updateCall(@PathVariable("id") Long callId, @RequestBody Call updatedCall) {
        Call call = callService.updateCall(callId, updatedCall);
        return ResponseEntity.ok(call);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCall(@PathVariable("id") Long callId) {
        callService.deleteCall(callId);
        return ResponseEntity.ok("Call deleted successfully.");
    }

    @GetMapping("/mycalls")
    public String calls() {
        return "my callls";
    }

    @PostMapping("/make-call")
    public Call callsController(@RequestBody LinkedHashMap<String, String> body) throws Exception {
        String userName = body.get("username");
        String startTime = body.get("startTime");
        String endTime = body.get("endTime");
        //String duration = body.get("duration");
        // String totalTime = body.get("totalTime");
      //  String costPerMinute = body.get("costPerMinute");
        String discountForCalls = body.get("discountForCalls");
        // String signUpDiscount = body.get("signUpDiscount");
       // String vat = body.get("vat");
        //String netCost = body.get("netCost");
      //  String grossCost = body.get("grossCost");
       // String totalCost = body.get("totalCost");
        String telephone = body.get("telephone");
       // String callDate = LocalDateTime.now().toString();//= body.get("callDate");

        //CallUser callUser = userService.getUserByUsername(userName);

        CallDto callsDto = new CallDto();

        callsDto.setStartTime(startTime);
        callsDto.setEndTime(endTime);
        //callsDto.setDuration(duration);
        //  callsDto.setTotalTime(totalTime);
       // callsDto.setCostPerMinute(costPerMinute);
        callsDto.setDiscountForCalls(discountForCalls);
        //callsDto.setSignUpDiscount(signUpDiscount);
       // callsDto.setVat(vat);
       // callsDto.setNetCost(netCost);
       // callsDto.setGrossCost(grossCost);
       // callsDto.setTotalCost(totalCost);
       // callsDto.setCallDate(LocalDateTime.now().toString());
        //callsDto.setInvoiced(false);
      //  callsDto.setPaid(false);

        Call call = callService.makeCall(userName, telephone, callsDto);

        rabbitMQJsonProducer.sendJsonMessage(call);

        return call;
    }

    /* 
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Call>> getCallsByUsername(@PathVariable String username) {
        try {
            List<Call> calls = callService.getCallsByUsername(username);
            return new ResponseEntity<>(calls, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    @GetMapping
    public ResponseEntity<List<Call>> getCallsByUsername(@RequestParam String username) {
        List<Call> calls = callService.getCallsByUsername(username);
        return ResponseEntity.ok(calls);
    }

    /* 
    @GetMapping("/paid")
    public ResponseEntity<List<Call>> getPaidCalls() {
        List<Call> paidCalls = invoiceService.getAllPaidCalls();
        return ResponseEntity.ok(paidCalls);
    }

    
    @GetMapping("/unpaid")
    public ResponseEntity<List<Call>> getUnpaidCalls() {
        List<Call> unpaidCalls = invoiceService.getAllUnpaidCalls();
        return ResponseEntity.ok(unpaidCalls);
    }

    @GetMapping("/unpaid/username")
    public ResponseEntity<List<Call>> getUnpaidCallsByUsername(@RequestParam String username) {
        List<Call> unpaidCalls = callService.getUnpaidCallsByUsername(username);
        return ResponseEntity.ok(unpaidCalls);
    }
    */

    /* 
    //come back to this
    @PostMapping("/end-calls")
    public ResponseEntity<String> endCalls(@RequestBody List<Call> calls) {
        // Call the service to end the calls and trigger invoice generation
        // callService.endCallsAndGenerateInvoice(calls);

        return ResponseEntity.ok("Calls ended successfully");
    }

    */
    /* 

    @PostMapping("/completed")
    public ResponseEntity<String> triggerCallsCompletedEvent(@RequestBody CallsCompletedEvent callsCompletedEvent) {
        // Handle the event by processing the completed calls
        List<CurrentCall> completedCalls = callsCompletedEvent.getCompletedCalls();
        String username = null;
        List<CompletedCallDto> completedCallDtos = new ArrayList<>();

        // Extract the username from the first completed call if available
        if (completedCalls != null && !completedCalls.isEmpty()) {
            CurrentCall firstCompletedCall = completedCalls.get(0);
            Users user = firstCompletedCall.getUser();
            if (user != null) {
                username = user.getUsername();

                // Log the extracted username
                System.out.println("Extracted username: " + username);

                // Convert each CurrentCall to CompletedCallDto
                for (CurrentCall currentCall : completedCalls) {
                    // Check if the user associated with the current call is not null
                    Users currentUser = currentCall.getUser();
                    if (currentUser != null) {
                        String extractedUsername = currentUser.getUsername(); // Use the existing variable
                        // Convert the current call to a CompletedCallDto
                        CompletedCallDto completedCallDto = callService.convertToCompletedCallDto(currentCall);
                        completedCallDtos.add(completedCallDto);

                        // Create an invoice for the completed call
                        //Invoice invoice = createInvoiceForCall(currentCall);

                    } else {
                        // Log that user is null for the current call
                        System.out.println("User is null for current call");
                    }
                }
            } else {
                // Log that user is null for the first completed call
                System.out.println("User is null for the first completed call");
            }
        } else {
            // Log that completedCalls is null or empty
            System.out.println("Completed calls list is null or empty");
        }

        // Further processing based on the completed calls

        return ResponseEntity.ok("Calls completed event triggered successfully");
    }
    
    */
    /* 
    @PostMapping("/completed")
    public ResponseEntity<String> triggerCallsCompletedEvent(@RequestBody CallsCompletedEvent callsCompletedEvent) {
       
        // Handle the event by processing the completed calls
        List<CurrentCall> completedCalls = callsCompletedEvent.getCompletedCalls();
        String username = null;
        List<CompletedCallDto> completedCallDtos = new ArrayList<>();
    
        // Extract the username from the first completed call if available
        if (!completedCalls.isEmpty()) {
            username = completedCalls.get(0).getUser().getUsername();
            
            // Convert each CurrentCall to CompletedCallDto
            for (CurrentCall currentCall : completedCalls) {
    
            CompletedCallDto completedCallDto = callService.convertToCompletedCallDto(currentCall);
                //CompletedCallDto completedCallDto = convertToCompletedCallDto(currentCall);
                completedCallDtos.add(completedCallDto);
            }
    }
    
    // Trigger any necessary actions based on the completed calls
    
    return ResponseEntity.ok("Calls completed event triggered successfully");
    }
    
    */
    /* 
    @PostMapping("/completed")
    public ResponseEntity<String> triggerCallsCompletedEvent(@RequestBody CallsCompletedEvent callsCompletedEvent) {
        // Handle the event by processing the completed calls
        List<CurrentCall> completedCalls = callsCompletedEvent.getCompletedCalls();
        String username = null;
    
        // Extract the username from the first completed call if available
        if (!completedCalls.isEmpty()) {
            username = completedCalls.get(0).getUser().getUsername();
        }
    
        // Trigger any necessary actions based on the completed calls
    
        return ResponseEntity.ok("Calls completed event triggered successfully");
    }*/
    /* 
    @GetMapping("/paid")
    public ResponseEntity<List<Call>> getPaidCallsForUser(@RequestParam Long userId) {
        List<Call> paidCalls = callService.findPaidCallsByUserId(userId);
        return ResponseEntity.ok(paidCalls);
    }
    */

    /* 
    @GetMapping("/receivers/{username}")
    public ResponseEntity<List<Call>> getCallReceiversForUser(@PathVariable String username) {
        try {
            List<Call> callReceivers = callService.getCallReceiversForUser(username);
            return new ResponseEntity<>(callReceivers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    /* 
    @GetMapping("/receivers/{username}")
    public ResponseEntity<List<CallReceiver>> getCallReceiversForUser(@PathVariable String username) {
        try {
            List<CallReceiver> callReceivers = callService.getCallReceiversForUser(username);
            return new ResponseEntity<>(callReceivers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    */
    /* 
    @GetMapping("/callReceivers/${username}")
    public ResponseEntity<List<Call>> getCallReceiversForUser(@PathVariable String username) {
        try {
            List<Call> calls = callService.getCallReceiversForUser(username);
            return new ResponseEntity<>(calls, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    /* 
    @GetMapping("/callReceivers/{username}")
    public ResponseEntity<List<CallReceiver>> getCallReceiversForUser(@PathVariable String username) {
        try {
            List<CallReceiver> callReceivers = callService.getCallReceiversForUser(username);
            return new ResponseEntity<>(callReceivers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    */
}
