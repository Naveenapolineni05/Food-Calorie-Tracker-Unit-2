import React, { useEffect, useState } from "react";
import Home from "./components/home.jsx";
import AddEditMeal from "./components/addEditMeal.jsx";
import Progress from "./components/progress.jsx";
import Settings from "./components/settings.jsx";
import About from "./components/About.jsx";
import Favorites from "./components/Favorites.jsx";
import Header from "./components/Header.jsx";
import { Routes, Route } from 'react-router-dom';

function App() {
    const mealOptions = ["BreakFast", "Lunch", "Snacks", "Dinner"];

    return (
        <div>
            <Header />
            <br />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit" element={<AddEditMeal mealTypes={mealOptions} />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}

export default App;
