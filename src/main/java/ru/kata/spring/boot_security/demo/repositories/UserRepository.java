package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.Query;
import ru.kata.spring.boot_security.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.roles where u.username=:username")
    User findByUsername(String username);

}
