import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


function Settings(props) {

    const { updateCalorieGoal, calorieGoal, resetData } = props;

    const [goal, setGoal] = useState(calorieGoal);
    const [isError, setIsError] = useState(false);

    const handleCalorieChange = (event) => {
        setGoal(event.target.value);

        const hasLetters = /[^0-9]/.test(event.target.value);
        setIsError(hasLetters);
    };

    const handleCalorieUpdate = () => {
        updateCalorieGoal(goal);
    }


    return (
        <Stack spacing={2} alignItems="strech">
            <TextField
                id="Calorie Goal"
                label="Calorie Goal"
                helperText={isError ? "Numbers only" : "Please enter your Calorie Goal"}
                fullWidth
                value={goal}
                onChange={handleCalorieChange}
                error={isError}

            />

            <Stack spacing={2} direction="row">
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="success"
                    onClick={handleCalorieUpdate}>
                    Save
                </Button>
                <Button
                    component={Link}
                    to="/progress"
                    variant="contained"
                    color="error"
                    onClick={resetData}>
                    Reset Data
                </Button>
                <Button
                    component={Link}
                    to="/"
                    variant="contained">
                    Back
                </Button>
            </Stack>
        </Stack>

    )

}
export default Settings;