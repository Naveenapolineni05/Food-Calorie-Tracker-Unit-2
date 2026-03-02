package com.example.foodcalorietracker.controllers;
import com.example.foodcalorietracker.models.Meals;
import com.example.foodcalorietracker.repositories.MealsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meals")
public class MealsController {
    private final MealsRepository mealsRepository;

    public MealsController(MealsRepository mealsRepository) {
        this.mealsRepository = mealsRepository;
    }

    @GetMapping("")
    public List<Meals> getAllMeals() {
        return mealsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Meals getMealById(@PathVariable int id) {
        return mealsRepository.findById(id).orElse(null);
    }

    @PostMapping("")
    public Meals createMeal(@RequestBody Meals meal) {
        return mealsRepository.save(meal);
    }

    @PutMapping("/{id}")
    public Meals updateMeal(@PathVariable int id, @RequestBody Meals meal) {
        meal.setId(id);
        return mealsRepository.save(meal);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable int id) {
        mealsRepository.deleteById(id);
    }
}
