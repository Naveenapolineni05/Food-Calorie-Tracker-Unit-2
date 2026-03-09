import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function WeeklySummary(props) {
    const { dataset } = props;
    const filteredDataSet = dataset.filter(d => d.day);
    // Dummy data: one object per day of week
    const dataset1 = [
        { day: 'Mon', breakfast: 300, lunch: 600, snacks: 150, dinner: 550 },
        { day: 'Tue', breakfast: 280, lunch: 650, snacks: 200, dinner: 500 },
        { day: 'Wed', breakfast: 320, lunch: 350, snacks: 500, dinner: 650 },
        { day: 'Thu', breakfast: 310, lunch: 630, snacks: 170, dinner: 520 },
        { day: 'Fri', breakfast: 300, lunch: 640, snacks: 190, dinner: 530 },
        { day: 'Sat', breakfast: 350, lunch: 700, snacks: 220, dinner: 600 },
        { day: 'Sun', breakfast: 330, lunch: 680, snacks: 210, dinner: 550 },
    ];

    return (
        <BarChart
            dataset={filteredDataSet}
            xAxis={[{ dataKey: 'day', label: 'Day of Week' }]}
            series={[
                { dataKey: 'breakfast', label: 'Breakfast', stack: 'meals', valueFormatter: (v) => (v && !isNaN(v) ? `${v} kcal` : '0 kcal') },
                { dataKey: 'lunch', label: 'Lunch', stack: 'meals', valueFormatter: (v) => (v && !isNaN(v) ? `${v} kcal` : '0 kcal') },
                { dataKey: 'snacks', label: 'Snacks', stack: 'meals', valueFormatter: (v) => (v && !isNaN(v) ? `${v} kcal` : '0 kcal')},
                { dataKey: 'dinner', label: 'Dinner', stack: 'meals', valueFormatter: (v) => (v && !isNaN(v) ? `${v} kcal` : '0 kcal') },
            ]}
            height={400}
        />
    );
}