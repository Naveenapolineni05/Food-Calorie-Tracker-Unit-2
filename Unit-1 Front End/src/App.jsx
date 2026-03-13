import React, { useEffect, useState } from "react";
import Home from "./components/home.jsx";
import AddEditMeal from "./components/addEditMeal.jsx";
import Progress from "./components/progress.jsx";
import Settings from "./components/settings.jsx";
import About from "./components/About.jsx";
import Header from "./components/Header.jsx";
import { Routes, Route } from 'react-router-dom';

function App() {
    const mealOptions = ["BreakFast", "Lunch", "Snacks", "Dinner"];
    const [calorieGoal, setCalorieGoal] = useState(2000);
    const [meal, setMeal] = useState({});
    const [dataSet, setDataSet] = useState([]);
    useEffect(() => {
        const index = dataSet?.findIndex(d => d.day === meal.day);

        if (index === -1) {
            setDataSet([...dataSet, meal]);
        }
        else {
            const updatedDataSet = [...dataSet];
            updatedDataSet[index] = meal;
            setDataSet(updatedDataSet);
        }
    }, [meal]);


    return (
        <div>
            <Header />
            <br />
            <Routes>
                <Route path="/" element={<Home goal={calorieGoal} meal={meal} />} />
                <Route path="/edit" element={<AddEditMeal mealTypes={mealOptions} setMeal={setMeal} meal={meal} />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}

export default App;
