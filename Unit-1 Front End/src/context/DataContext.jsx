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

    const [mealDetails, setMealDetails] = useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userId, setUserId] = useState(null);


    const fetchDailyGoal = async () => {
        if (!userId) return;
        let goal = 2500;

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/goals`);

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
            const response = await fetch(`http://localhost:8080/users/${userId}/goals`, {
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
        if (!userId) return;
        let mealData = {};

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`);

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
        if (!userId) return;
        let weeklyData = [];

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}`);

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
                    const dayName = mealDate.format('ddd');
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

    const fetchMealDetails = async () => {
        if (!userId) return;
        let details = [];

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/meals`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`);
            } else {
                const meals = await response.json();

                const today = new Date().toISOString().split('T')[0];

                const todaysMeals = meals.filter(meal => meal.date === today);

                // Group by category
                const categoryMap = {};
                todaysMeals.forEach(meal => {
                    const category = meal.category;
                    if (!categoryMap[category]) {
                        categoryMap[category] = [];
                    }
                    categoryMap[category].push({ id: meal.id, name: meal.name, calories: meal.calories });
                });

                // Transform to desired structure
                details = Object.keys(categoryMap).map(category => ({
                    Category: category,
                    Items: categoryMap[category]
                }));
            }

        } catch (error) {
            console.error(error.message);
        } finally {
            setMealDetails(details);
        }
    }

    const deleteMeal = async (mealId) => {
        try {
            const response = await fetch(`http://localhost:8080/users/1/meals/${mealId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`);
            }

            // Refresh meal details after deletion
            await fetchMealDetails();
            await fetchUserMealCaloriesForTheDay();

        } catch (error) {
            console.error("Error deleting meal:", error.message);
        }
    }

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            if (data.userId) {
                setUserId(data.userId);
                setIsLoggedIn(true);
                // Load user data after login
                await fetchDailyGoal();
                await fetchUserMealCaloriesForTheDay();
                await fetchWeeklyUserMeals();
                return { success: true };
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserId(null);
        setDailyGoal(null);
        setMeal({});
        setWeeklyMeals([]);
        setMealDetails([]);
    }



    useEffect(() => {
        // Only load data if user is logged in
        if (isLoggedIn && userId) {
            fetchDailyGoal();
            fetchUserMealCaloriesForTheDay();
            fetchWeeklyUserMeals();
        }
    }, [isLoggedIn, userId])

    useEffect(() => {
        setIsLoading(false);
    }, [dailyGoal, meal])

    return (
        <DataContext.Provider
        value={{isLoading, dailyGoal, meal, weeklyMeals, mealDetails, fetchDailyGoal, updateGoals, fetchUserMealCaloriesForTheDay, fetchWeeklyUserMeals, fetchMealDetails, deleteMeal, login, logout, isLoggedIn, userId}}>

            {children}

        </DataContext.Provider>

    );
}