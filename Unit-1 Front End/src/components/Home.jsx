import React, { useContext } from "react";
import NavBar from "./NavBar";
import CustomizedProgressBar from "./CustomizedProgressBar";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import { DataContext } from "../context/DataContext";



function Home(props) {
    const { dailyGoal, meal } = useContext(DataContext);
    const mealOptions = ["BreakFast", "Lunch", "Snacks", "Dinner"];

    const totalCalories = () => {
        const breakfastCalories = Number(meal.breakfast) || 0;
        const lunchCalories = Number(meal.lunch) || 0;
        const snacksCalories = Number(meal.snacks) || 0;
        const dinnerCalories = Number(meal.dinner) || 0;
        return breakfastCalories + lunchCalories + snacksCalories + dinnerCalories;

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
        </Stack>

    )

}

export default Home;