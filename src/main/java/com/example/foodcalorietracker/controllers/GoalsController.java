package com.example.foodcalorietracker.controllers;
import com.example.foodcalorietracker.models.Goals;
import com.example.foodcalorietracker.models.Users;
import com.example.foodcalorietracker.repositories.GoalsRepository;
import com.example.foodcalorietracker.repositories.UsersRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getItem(@PathVariable int userId) {
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        Goals goals = user.getGoals();
        if (goals == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Goals not found");
        return ResponseEntity.ok(goals);
    }

    @PostMapping("")
    public ResponseEntity<?> addItem(@PathVariable int userId, @RequestBody Goals goals){
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        if (user.getGoals() != null) return ResponseEntity.status(HttpStatus.CONFLICT).body("Goals already exist for this user");
        goals.setUser(user);
        return ResponseEntity.ok(goalsRepository.save(goals));
    }

    @PutMapping("")
    public ResponseEntity<?> updateItem(@PathVariable int userId, @RequestBody Goals goals){
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        Goals existingGoal = user.getGoals();
        if (existingGoal != null) {
            existingGoal.setDailyGoal(goals.getDailyGoal());
            existingGoal.setWeeklyGoal(goals.getWeeklyGoal());
            return ResponseEntity.ok(goalsRepository.save(existingGoal));
        } else {
            goals.setUser(user);
            return ResponseEntity.ok(goalsRepository.save(goals));
        }
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteItem(@PathVariable int userId){
        Users user = usersRepository.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        Goals goals = user.getGoals();
        if (goals == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Goals not found");
        goalsRepository.delete(goals);
        return ResponseEntity.ok("Goals deleted successfully");
    }
}
