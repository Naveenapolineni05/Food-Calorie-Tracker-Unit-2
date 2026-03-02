package com.example.foodcalorietracker.repositories;
import com.example.foodcalorietracker.models.Meals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealsRepository extends JpaRepository<Meals, Integer> {
}
