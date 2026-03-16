import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import NavBar from "./NavBar";
import Stack from "@mui/material/Stack";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DataContext } from "../context/DataContext";



function AddEditMeal(props) {
    const { mealTypes } = props;
    const { fetchUserMealCaloriesForTheDay, fetchWeeklyUserMeals } = useContext(DataContext);
    const [date, setDate] = useState(dayjs());
    const [itemName, setItemName] = useState("");
    const [calories, setCalories] = useState("");
    const [mealType, setMealType] = useState(mealTypes[0]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState("");

    const handleitemNameChange = event => {
        setItemName(event.target.value);
    }

    const handleCaloriesChange = event => {
        setCalories(event.target.value);
    }

    const handleMealTypeChange = event => {
        setMealType(event.target.value);
    }

    const updateMeal = async () => {
        const isoDate = date.format("YYYY-MM-DD");
        const day = date.format("ddd");

        const requestBody = {
            name: itemName,
            calories: Number(calories),
            category: mealType,
            date: isoDate,
            favorite: isFavorite
        };

        try {
            const response = await fetch("http://localhost:8080/users/1/meals", {
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

            setError("");
            await fetchUserMealCaloriesForTheDay();
            await fetchWeeklyUserMeals();
        } catch (err) {
            const message = err?.message || "Failed to save meal.";
            setError(message);
            console.error("Failed to save meal:", err);
        }
    }

    return (

        <Stack spacing={2} alignItems="stretch">
            <NavBar />
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    value={date}
                    onChange={(newDate) => {
                        setDate(newDate);
                        console.log("Selected Date:", newDate?.format("YYYY-MM-DD"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <TextField
                id="Meal Type"
                select
                label="Meal Type"
                fullWidth
                helperText="Please select your Meal Type"
                value={mealType}
                onChange={handleMealTypeChange}
            >
                {mealTypes?.map((mealType) => (
                    <MenuItem key={mealType} value={mealType}>
                        {mealType}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                id="Item Name"
                label="Item Name"
                helperText="Please enter the Item Name"
                fullWidth
                value={itemName}
                onChange={handleitemNameChange}
            />

            <TextField
                id="Calories"
                label="Calories"
                helperText="Please enter the Calories"
                fullWidth
                type="Number"
                value={calories}
                onChange={handleCaloriesChange}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isFavorite}
                        onChange={(event) => setIsFavorite(event.target.checked)}
                        color="primary"
                    />
                }
                label="Add to favorites"
            />

            <Stack spacing={2} direction="row">
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="success"
                    onClick={updateMeal}>
                    Save
                </Button>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="error">
                    Cancel
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
export default AddEditMeal;