package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ru.kata.spring.boot_security.demo.entities.Role;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.exceptions.NotFoundException;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.findAllUsers(), HttpStatus.OK);
    }

    @GetMapping(value = "/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.findAllRoles(), HttpStatus.OK);
    }

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) throws NotFoundException {
        User user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

   @PostMapping(value = "/post/user")
    public ResponseEntity<HttpStatus> createUser(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping(value = "/users/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody User user,
                             @PathVariable("id") Long id) throws NotFoundException {
        userService.editUser(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Long id) {
        userService.removeUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
