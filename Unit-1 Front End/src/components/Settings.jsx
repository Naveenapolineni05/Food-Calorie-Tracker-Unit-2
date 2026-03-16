import React, { useState, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";


function Settings() {
    const { dailyGoal, updateGoals } = useContext(DataContext);

    const [goal, setGoal] = useState(dailyGoal);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setGoal(dailyGoal);
    }, [dailyGoal]);

    const handleCalorieChange = (event) => {
        setGoal(event.target.value);

        const hasLetters = /[^0-9]/.test(event.target.value);
        setIsError(hasLetters);
    };

    const handleCalorieUpdate = async () => {
        try {
            setError("");
            await updateGoals(goal);
        } catch (err) {
            setError(err?.message || "Failed to save goal.");
        }
    }


    return (
        <Stack spacing={2} alignItems="strech">
            <NavBar />
            {error && (
                <div style={{ color: 'red' }}>
                    {error}
                </div>
            )}
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
                    to="/"
                    variant="contained">
                    Back
                </Button>
            </Stack>
        </Stack>

    )

}
export default Settings;