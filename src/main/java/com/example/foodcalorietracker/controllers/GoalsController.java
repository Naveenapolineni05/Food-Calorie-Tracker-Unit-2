package com.example.foodcalorietracker.controllers;
import com.example.foodcalorietracker.models.Goals;
import com.example.foodcalorietracker.models.Users;
import com.example.foodcalorietracker.repositories.GoalsRepository;
import com.example.foodcalorietracker.repositories.UsersRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/{userId}/goals")
public class GoalsController {
    private final GoalsRepository goalsRepository;
    private final UsersRepository usersRepository;

    public GoalsController(GoalsRepository goalsRepository, UsersRepository usersRepository) {
        this.goalsRepository = goalsRepository;
        this.usersRepository = usersRepository;
    }

    @GetMapping("")
    public Goals getItem(@PathVariable int userId) {
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        return user.getGoals();
    }

    @PostMapping("")
    public Goals addItem(@PathVariable int userId, @RequestBody Goals goals){
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        goals.setUser(user);
        return goalsRepository.save(goals);
    }

    @PutMapping("")
    public Goals updateItem(@PathVariable int userId, @RequestBody Goals goals){
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return null;
        Goals existingGoal = user.getGoals();
        if (existingGoal != null) {
            existingGoal.setDailyGoal(goals.getDailyGoal());
            existingGoal.setWeeklyGoal(goals.getWeeklyGoal());
            return goalsRepository.save(existingGoal);
        } else {
            goals.setUser(user);
            return goalsRepository.save(goals);
        }
    }

    @DeleteMapping("")
    public void deleteItem(@PathVariable int userId){
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return;
        Goals goals = user.getGoals();
        if (goals != null) {
            goalsRepository.delete(goals);
        }
    }
}
