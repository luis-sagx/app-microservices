package com.example.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "Gateway is running!";
    }

    @GetMapping("/")
    public String home() {
        return "API Gateway - Luis Store";
    }
}
