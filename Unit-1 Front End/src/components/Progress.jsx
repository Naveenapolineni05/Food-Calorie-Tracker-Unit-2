import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import CustomizedProgressBar from "./CustomizedProgressBar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import WeeklySummary from "./WeeklySummary";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";


function Progress() {
    const { dailyGoal, weeklyMeals, fetchWeeklyUserMeals } = useContext(DataContext);

    useEffect(() => {
        fetchWeeklyUserMeals();
    }, []);

    const weeklyGoal = dailyGoal ? dailyGoal * 7 : 0;

    const totalWeeklyCalories = () => {
        return weeklyMeals.reduce((total, day) => {
            const breakfast = Number(day.breakfast) || 0;
            const lunch = Number(day.lunch) || 0;
            const snacks = Number(day.snacks) || 0;
            const dinner = Number(day.dinner) || 0;
            return total + breakfast + lunch + snacks + dinner;
        }, 0);
    }

    return (
        <Stack spacing={2} alignItems="strech">
            <NavBar />
            <h2>Weekly Summary</h2>
            <Card sx={{ minWidth: 200 }} raised>
                <CardContent>
                    <CustomizedProgressBar goal={weeklyGoal} caloriesConsumed={totalWeeklyCalories()}/>
                </CardContent>
            </Card>
            <WeeklySummary />
            <Stack spacing={2} direction="row">
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
export default Progress;
