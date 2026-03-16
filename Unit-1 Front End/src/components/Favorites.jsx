import React, { useState, useEffect, useContext } from "react";
import NavBar from "./NavBar";
import { DataContext } from "../context/DataContext";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";

function Favorites() {
    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [addingMeal, setAddingMeal] = useState(null);

    const { userId, fetchUserMealCaloriesForTheDay, fetchWeeklyUserMeals } = useContext(DataContext);

    const fetchFavoriteMeals = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/meals`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`);
            }

            const meals = await response.json();
            const favorites = meals.filter(meal => meal.favorite === true);
            setFavoriteMeals(favorites);
        } catch (err) {
            const message = err?.message || "Failed to fetch favorite meals.";
            setError(message);
            console.error("Failed to fetch favorite meals:", err);
        } finally {
            setLoading(false);
        }
    };

    const addToTodaysMeal = async (meal) => {
        setAddingMeal(meal.id);
        const today = new Date().toISOString().split('T')[0];

        const requestBody = {
            name: meal.name,
            calories: meal.calories,
            category: meal.category,
            date: today,
            favorite: false
        };

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/meals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - status ${response.status}`);
            }

            // Refresh favorite meals
            await fetchFavoriteMeals();
            await fetchUserMealCaloriesForTheDay();
            await fetchWeeklyUserMeals();
            alert(`${meal.name} added to today's meals!`);
        } catch (err) {
            const message = err?.message || "Failed to add meal to today's meals.";
            alert(`Error: ${message}`);
            console.error("Failed to add meal:", err);
        } finally {
            setAddingMeal(null);
        }
    };

    useEffect(() => {
        fetchFavoriteMeals();
    }, []);

    if (loading) {
        return (
            <Stack spacing={2} alignItems="center">
                <NavBar />
                <Typography variant="h6">Loading favorite meals...</Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={2} alignItems="stretch">
            <NavBar />
            <Typography variant="h4" align="center" gutterBottom>
                <StarIcon sx={{ mr: 1, color: 'gold' }} />
                Favorite Meals
            </Typography>

            {error && (
                <Typography color="error" variant="body2" align="center">
                    {error}
                </Typography>
            )}

            {!error && favoriteMeals.length === 0 && (
                <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                    No favorite meals found. Add some meals and mark them as favorites!
                </Typography>
            )}

            <Stack spacing={2} alignItems="stretch" sx={{ px: 2 }}>
                {favoriteMeals.map((meal) => (
                    <Card key={meal.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" component="div">
                                    {meal.name}
                                </Typography>
                                <Chip
                                    icon={<StarIcon />}
                                    label={`${meal.calories} cal`}
                                    color="primary"
                                    variant="outlined"
                                />
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <Chip
                                    label={meal.category}
                                    size="small"
                                    color="secondary"
                                />
                                <Chip
                                    label={meal.date}
                                    size="small"
                                    variant="outlined"
                                />
                            </Stack>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={() => addToTodaysMeal(meal)}
                                disabled={addingMeal === meal.id}
                                variant="contained"
                                color="success"
                            >
                                {addingMeal === meal.id ? "Adding..." : "Add to Today's Meal"}
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Stack>
    );
}

export default Favorites;