import React from "react";
import NavBar from "./NavBar";
import CustomizedProgressBar from "./CustomizedProgressBar";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";

function Home(props) {
    const { goal, meal } = props;
    const mealOptions = ["BreakFast", "Lunch", "Snacks", "Dinner"];

    const totalCalories = () => {
        const breakfastCalories = Number(meal.breakfast) || 0;
        const lunchCalories = Number(meal.lunch) || 0;
        const snacksCalories = Number(meal.snacks) || 0;
        const dinnerCalories = Number(meal.dinner) || 0;
        return breakfastCalories + lunchCalories + snacksCalories + dinnerCalories;

    }

    return (
        <Stack spacing={2} alignItems="strech">
            <NavBar />
            <h2> Daily Summary </h2>
            <CustomizedProgressBar goal={goal} dailyCalories={totalCalories()} />
            <Stack spacing={2} alignItems="strech">
                {mealOptions.map(mealOption =>
                    <div key={mealOption}>
                        <TextField
                            id={mealOption}
                            label={mealOption}
                            fullWidth
                            defaultValue={meal[mealOption.toLowerCase()]}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />
                    </div>
                )}
            </Stack>
        </Stack>

    )

}

export default Home;