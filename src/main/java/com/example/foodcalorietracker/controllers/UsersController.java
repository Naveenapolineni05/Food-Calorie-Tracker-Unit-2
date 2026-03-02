package com.example.foodcalorietracker.controllers;
import com.example.foodcalorietracker.models.Users;
import com.example.foodcalorietracker.repositories.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {
    private final UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping("")
    public List<Users> getAllItems() {
        return usersRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getItem(@PathVariable int id) {
        return usersRepository.findById(id).orElse(null);
    }

    @PostMapping("")
    public Users addItem(@RequestBody Users users){
        return usersRepository.save(users);
    }

    @PutMapping("/{id}")
    public Users updateItem(@PathVariable int id, @RequestBody Users users){
        users.setId(id);
        return usersRepository.save(users);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id){
        usersRepository.deleteById(id);
    }
}
