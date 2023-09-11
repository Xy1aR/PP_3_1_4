package ru.kata.spring.boot_security.demo.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.exceptions.NotFoundException;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAllUsers();

    User findById(Long id) throws NotFoundException;

    User findByUsername(String username);

    void addUser(User user);

    void removeUser(Long id);

    void editUser(User user);

}
