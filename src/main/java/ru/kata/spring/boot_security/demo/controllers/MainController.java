package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class MainController {

    @GetMapping()
    public String mainPage() {
        return "redirect:/login";
    }

    @GetMapping("/user")
    public String userPage() {
        return "user-test";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "admin-test";
    }
}
