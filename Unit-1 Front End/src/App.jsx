import React, { useEffect, useState, useContext } from "react";
import Home from "./components/home.jsx";
import AddEditMeal from "./components/addEditMeal.jsx";
import Progress from "./components/progress.jsx";
import Settings from "./components/settings.jsx";
import About from "./components/About.jsx";
import Favorites from "./components/Favorites.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Login.jsx";
import { Routes, Route } from 'react-router-dom';
import { DataContext } from "./context/DataContext";


function App() {
    const { isLoggedIn } = useContext(DataContext);
    const mealOptions = ["BreakFast", "Lunch", "Snacks", "Dinner"];

    if (!isLoggedIn) {
        return <Login />;
    }

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
