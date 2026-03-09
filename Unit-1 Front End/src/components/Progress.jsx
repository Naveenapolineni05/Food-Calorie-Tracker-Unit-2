import React from "react";
import CustomizedProgressBar from "./CustomizedProgressBar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import WeeklySummary from "./WeeklySummary";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";


function Progress(props) {
    const {dataSet, goal, meal}= props;

     const totalCalories = () => {
        const breakfastCalories = Number(meal.breakfast) || 0;
        const lunchCalories = Number(meal.lunch) || 0;
        const snacksCalories = Number(meal.snacks) || 0;
        const dinnerCalories = Number(meal.dinner) || 0;
        return breakfastCalories + lunchCalories + snacksCalories + dinnerCalories;

    }

    return (
        <Stack spacing={2} alignItems="strech">
            <h2>Daily Summary</h2>
            <Card sx={{ minWidth: 200 }} raised>
                <CardContent>
                    <CustomizedProgressBar goal={goal} dailyCalories={totalCalories()}/>
                </CardContent>
            </Card>
            <WeeklySummary dataset={dataSet}/>
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
