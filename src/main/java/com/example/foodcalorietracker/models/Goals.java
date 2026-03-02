package com.example.foodcalorietracker.models;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Goals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int dailyGoal;
    private int weeklyGoal;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    public Goals() {
    }

    public Goals(int dailyGoal, int weeklyGoal) {
        this.dailyGoal = dailyGoal;
        this.weeklyGoal = weeklyGoal;
    }

    public int getDailyGoal() {
        return dailyGoal;
    }

    public void setDailyGoal(int dailyGoal) {
        this.dailyGoal = dailyGoal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public int getWeeklyGoal() {
        return weeklyGoal;
    }

    public void setWeeklyGoal(int weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
    }
}
