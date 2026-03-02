package com.example.foodcalorietracker.repositories;
import com.example.foodcalorietracker.models.Goals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalsRepository extends JpaRepository<Goals, Integer> {
}
