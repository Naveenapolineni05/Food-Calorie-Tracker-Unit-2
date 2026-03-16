package com.example.foodcalorietracker.dtos;

public class LoginResponse {
    private Integer userId;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(Integer userId, String message) {
        this.userId = userId;
        this.message = message;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

