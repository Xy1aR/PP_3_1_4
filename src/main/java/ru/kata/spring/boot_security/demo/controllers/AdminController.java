package ru.kata.spring.boot_security.demo.controllers;

import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.exceptions.NotFoundException;
import ru.kata.spring.boot_security.demo.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/admin")
    public String getAllUsers(ModelMap model) {
        model.addAttribute("usersList", userService.findAllUsers());
        return "users";
    }

    @GetMapping(value = "/admin/new")
    public String addUser(@ModelAttribute("user") User user) {
        return "new-user";
    }

    @PostMapping(value = "/admin/new")
    public String createUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @GetMapping(value = "/admin/edit")
    public String editUser(@RequestParam("id") Long id,
                           ModelMap model) throws NotFoundException {
        model.addAttribute("user", userService.findById(id));
        return "edit-user";
    }

    @PatchMapping(value = "/admin/edit")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.editUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping(value = "/admin")
    public String removeUser(@RequestParam("id") Long id) {
        userService.removeUser(id);
        return "redirect:/admin";
    }

}
