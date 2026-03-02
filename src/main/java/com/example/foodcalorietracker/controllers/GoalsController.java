package com.example.foodcalorietracker.controllers;
import com.example.foodcalorietracker.models.Goals;
import com.example.foodcalorietracker.repositories.GoalsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalsController {
    private final GoalsRepository goalsRepository;

    public GoalsController(GoalsRepository goalsRepository) {
        this.goalsRepository = goalsRepository;
    }

    @GetMapping("")
    public List<Goals> getAllItems() {
        return goalsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Goals getItem(@PathVariable int id) {
        return goalsRepository.findById(id).orElse(null);
    }

    @PostMapping("")
    public Goals addItem(@RequestBody Goals goals){
        return goalsRepository.save(goals);
    }

    @PutMapping("/{id}")
    public Goals updateItem(@PathVariable int id, @RequestBody Goals goals){
        goals.setId(id);
        return goalsRepository.save(goals);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id){
        goalsRepository.deleteById(id);
    }
}
