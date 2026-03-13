package com.example.foodcalorietracker.controllers;
import com.example.foodcalorietracker.models.Meals;
import com.example.foodcalorietracker.models.Users;
import com.example.foodcalorietracker.repositories.MealsRepository;
import com.example.foodcalorietracker.repositories.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/meals")
public class MealsController {
    private final MealsRepository mealsRepository;
    private final UsersRepository usersRepository;

    public MealsController(MealsRepository mealsRepository, UsersRepository usersRepository) {
        this.mealsRepository = mealsRepository;
        this.usersRepository = usersRepository;
    }

    @GetMapping("")
    public List<Meals> getAllMeals(@PathVariable int userId) {
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        return user.getMeals();
    }

    @GetMapping("/{id}")
    public Meals getMealById(@PathVariable int userId, @PathVariable int id) {
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        return mealsRepository.findById(id).orElse(null);
    }

    @PostMapping("")
    public Meals createMeal(@PathVariable int userId, @RequestBody Meals meal) {
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        meal.setUser(user);
        return mealsRepository.save(meal);
    }

    @PutMapping("/{id}")
    public Meals updateMeal(@PathVariable int userId, @PathVariable int id, @RequestBody Meals meal) {
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        meal.setId(id);
        meal.setUser(user);
        return mealsRepository.save(meal);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable int userId, @PathVariable int id) {
        mealsRepository.deleteById(id);
    }
}
