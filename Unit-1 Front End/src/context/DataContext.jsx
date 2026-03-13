import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import dayjs from "dayjs";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [dailyGoal, setDailyGoal] = useState(null);

    const [meal, setMeal] = useState({});

    const [weeklyMeals, setWeeklyMeals] = useState([]);


    const fetchDailyGoal = async () => {
        let goal = 2500;

        try {
            const response = await fetch("http://localhost:8080/users/1/goals");

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`)
            } else {
                const data = await response.json();

                goal = data.dailyGoal;
            }

        } catch (error) {
            console.error(error.message)
        } finally {
            setDailyGoal(goal);
        }

    }

    const updateGoals = async (newDailyGoal) => {
        const dailyGoalValue = Number(newDailyGoal);
        if (Number.isNaN(dailyGoalValue) || dailyGoalValue <= 0) {
            throw new Error("Invalid daily goal");
        }

        const requestBody = {
            dailyGoal: dailyGoalValue,
            weeklyGoal: dailyGoalValue * 7
        };

        try {
            const response = await fetch("http://localhost:8080/users/1/goals", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`);
            }

            setDailyGoal(dailyGoalValue);
        } catch (error) {
            console.error("Failed to update goals:", error);
            throw error;
        }
    }

    const fetchUserMealCaloriesForTheDay = async () => {
        console.log("fetchUserMealCaloriesForTheDay called");
        let mealData = {};

        try {
            const response = await fetch("http://localhost:8080/users/1");

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`)
            } else {
                const data = await response.json();

                // Process meals for today's date
                const today = new Date().toISOString().split('T')[0];
                const categories = ["BreakFast", "Lunch", "Snacks", "Dinner"];
                const mealCalories = {
                    breakfast: 0,
                    lunch: 0,
                    snacks: 0,
                    dinner: 0
                };

                const todaysMeals = data.meals.filter(meal => meal.date === today);

                todaysMeals.forEach(meal => {
                    const categoryKey = meal.category.toLowerCase();
                    if (mealCalories.hasOwnProperty(categoryKey)) {
                        mealCalories[categoryKey] += meal.calories;
                    }
                });

                mealData = mealCalories;
            }

        } catch (error) {
            console.error(error.message)
        } finally {
            setMeal(mealData);
        }

    }

    const fetchWeeklyUserMeals = async () => {
        console.log("fetchWeeklyUserMeals called");
        let weeklyData = [];

        try {
            const response = await fetch("http://localhost:8080/users/1");

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`)
            } else {
                const data = await response.json();

                // Get current week start (Monday) and end (Sunday)
                const today = dayjs();
                const startOfWeek = today.startOf('week').add(1, 'day'); // Monday
                const endOfWeek = today.endOf('week').add(1, 'day'); // Sunday

                // Filter meals within the current week
                const weeklyMealsFiltered = data.meals.filter(meal => {
                    const mealDate = dayjs(meal.date);
                    return mealDate.isAfter(startOfWeek.subtract(1, 'day')) && mealDate.isBefore(endOfWeek.add(1, 'day'));
                });

                // Group by day of week
                const dayMap = {};
                const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

                weeklyMealsFiltered.forEach(meal => {
                    const mealDate = dayjs(meal.date);
                    const dayName = mealDate.format('ddd'); // e.g., 'Mon'
                    if (!dayMap[dayName]) {
                        dayMap[dayName] = { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 };
                    }
                    const categoryKey = meal.category.toLowerCase();
                    if (dayMap[dayName].hasOwnProperty(categoryKey)) {
                        dayMap[dayName][categoryKey] += meal.calories;
                    }
                });

                // Create array for each day
                weeklyData = daysOfWeek.map(day => ({
                    day,
                    breakfast: dayMap[day]?.breakfast || 0,
                    lunch: dayMap[day]?.lunch || 0,
                    snacks: dayMap[day]?.snacks || 0,
                    dinner: dayMap[day]?.dinner || 0
                }));
            }

        } catch (error) {
            console.error(error.message)
        } finally {
            setWeeklyMeals(weeklyData);
        }

    }



    useEffect(() => {
        fetchDailyGoal();
        fetchUserMealCaloriesForTheDay();
        fetchWeeklyUserMeals();
    }, [])

    useEffect(() => {
        setIsLoading(false);
    }, [dailyGoal, meal])

    return (
        <DataContext.Provider
        value={{isLoading, dailyGoal, meal, weeklyMeals, fetchDailyGoal, updateGoals, fetchUserMealCaloriesForTheDay, fetchWeeklyUserMeals}}>

            {children}

        </DataContext.Provider>

    );
}