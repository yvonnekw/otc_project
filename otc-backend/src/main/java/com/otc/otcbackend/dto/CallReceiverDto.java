package com.otc.otcbackend.dto;

public class CallReceiverDto {

    private Long callReceiverId;
	private String telephone;
	
    public CallReceiverDto() {
    }

    public Long getCallReceiverId() {
        return callReceiverId;
    }
    public void setCallReceiverId(Long callReceiverId) {
        this.callReceiverId = callReceiverId;
    }
  
    public String getTelephone() {
        return telephone;
    }
    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public CallReceiverDto(Long callReceiverId, String telephone) {
        this.callReceiverId = callReceiverId;
        this.telephone = telephone;
    }

    @Override
    public String toString() {
        return "CallReceiverDto [callReceiverId=" + callReceiverId + ", telephone=" + telephone + "]";
    }
   
}
