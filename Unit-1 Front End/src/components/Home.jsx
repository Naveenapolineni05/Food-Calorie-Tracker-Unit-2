import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import CustomizedProgressBar from "./CustomizedProgressBar";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from "../context/DataContext";



function Home() {
    const { dailyGoal, meal, fetchMealDetails, mealDetails, deleteMeal } = useContext(DataContext);
    const [showDetails, setShowDetails] = useState(false);
    const mealOptions = ["BreakFast", "Lunch", "Snacks", "Dinner"];

    const totalCalories = () => {
        const breakfastCalories = Number(meal.breakfast) || 0;
        const lunchCalories = Number(meal.lunch) || 0;
        const snacksCalories = Number(meal.snacks) || 0;
        const dinnerCalories = Number(meal.dinner) || 0;
        return breakfastCalories + lunchCalories + snacksCalories + dinnerCalories;

    }

    const handleViewDetails = () => {
        if (!showDetails) {
            fetchMealDetails();
        }
        setShowDetails(!showDetails);
    }

    return (
        <Stack spacing={2} alignItems="stretch">
            <NavBar />
            <h2> Daily Summary </h2>
            <CustomizedProgressBar goal={dailyGoal} caloriesConsumed={totalCalories()} />
            <Stack spacing={2} alignItems="stretch">
                {mealOptions.map(mealOption =>
                    <div key={mealOption}>
                        <TextField
                            id={mealOption}
                            label={mealOption}
                            fullWidth
                            value={meal[mealOption.toLowerCase()] ?? ""}
                            InputProps={{
                                readOnly: true,
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                )}
            </Stack>
            <Button variant="contained" onClick={handleViewDetails}>
                {showDetails ? "Hide Details" : "View Details"}
            </Button>
            {showDetails && (
                <Stack spacing={2} alignItems="stretch">
                    {mealDetails.map((category, index) => (
                        <div key={index}>
                            <h3>{category.Category}</h3>
                            <Stack spacing={1} alignItems="stretch">
                                {category.Items.map((item, itemIndex) => (
                                    <Box key={itemIndex} display="flex" alignItems="center" gap={1}>
                                        <TextField
                                            label={item.name}
                                            fullWidth
                                            value={`${item.calories} calories`}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => deleteMeal(item.id)}
                                            title="Delete meal"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>
                        </div>
                    ))}
                </Stack>
            )}
        </Stack>

    )

}

export default Home;