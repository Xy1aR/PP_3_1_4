package ru.kata.spring.boot_security.demo.controllers;

import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.exceptions.NotFoundException;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
@RequestMapping(value = "/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String getAllUsers(ModelMap model, Principal principal) {
        model.addAttribute("usersList", userService.findAllUsers());
        model.addAttribute("user", userService.findByUsername(principal.getName()));
        model.addAttribute("roles", roleService.findAllRoles());
        return "admin";
    }

    @PostMapping(value = "/new")
    public String createUser(@ModelAttribute("user") User user) {
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PatchMapping(value = "/edit/{id}")
    public String updateUser(@ModelAttribute("user") User user) throws NotFoundException {
        userService.editUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping()
    public String removeUser(@RequestParam("id") Long id) {
        userService.removeUser(id);
        return "redirect:/admin";
    }

}
