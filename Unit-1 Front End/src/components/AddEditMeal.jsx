import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



function AddEditMeal(props) {
    const { mealTypes, setMeal, meal } = props;
    const [date, setDate] = useState(dayjs());
    const [itemName, setItemName] = useState("");
    const [calories, setCalories] = useState("");
    const [mealType, setMealType] = useState(mealTypes[0]);

    const handleitemNameChange = event => {
        setItemName(event.target.value);
    }

    const handleCaloriesChange = event => {
        setCalories(event.target.value);
    }

    const handleMealTypeChange = event => {
        setMealType(event.target.value);
    }

    const updateMeal = () => {
        const day = date.format("ddd");

        if (meal.day === day) {

            const updatedMeal = {
                day,
                breakfast: meal.breakfast,
                lunch: meal.lunch,
                snacks: meal.snacks,
                dinner: meal.dinner,
                [mealType.toLowerCase()]: Number(calories)
            };

            setMeal(updatedMeal);
        } else {
            const updatedMeal = {
                day,
                breakfast: 0,
                lunch: 0,
                snacks: 0,
                dinner: 0,
                [mealType.toLowerCase()]: Number(calories)
            };

            setMeal(updatedMeal);
        }

    }

    return (

        <Stack spacing={2} alignItems="strech">
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