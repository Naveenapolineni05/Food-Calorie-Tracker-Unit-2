# 🍎 Food Calorie Tracker

A **Food Calorie Tracker** web application that helps users monitor their daily calorie intake by logging meals throughout the day. The app allows users to set a customizable daily calorie goal, add or remove meals, and visualize their weekly calorie progress.

This project is built using:

* **Backend:** Spring Boot
* **Frontend:** React
* **Database:** MySQL

🔗 **GitHub Repository:**
[https://github.com/Naveenapolineni05/Food-Calorie-Tracker-Unit-2](https://github.com/Naveenapolineni05/Food-Calorie-Tracker-Unit-2)

---

# 📌 Features

### 1️ Daily Calorie Tracking

* Track the calories consumed throughout the day.
* View total calories consumed against the daily goal.

### 2️ Custom Daily Calorie Goal

* Users can **set and update their daily calorie goal**.

### 3️ Meal Management

Users can add and delete meals under the following categories:

* 🍳 Breakfast
* 🍛 Lunch
* 🍿 Snacks
* 🍽 Dinner

Each meal records:

* Food name
* Calorie value

### 4️ Weekly Progress Tracking

* The **Progress tab** shows calorie intake trends for the week.
* Helps users understand eating patterns and progress.

### 5️ CRUD Operations

Users can:

* Add meals
* Delete meals
* View meals by category
* Track total daily calories

---

# Tech Stack

## Frontend

* React
* JavaScript
* HTML
* CSS

## Backend

* Spring Boot
* REST APIs
* Java

## Database

* MySQL

---

# ⚙️ Installation & Setup

## 1️ Clone the Repository

```bash
git clone https://github.com/Naveenapolineni05/Food-Calorie-Tracker-Unit-2.git
cd Food-Calorie-Tracker-Unit-2
```

---

# 🔧 Backend Setup (Spring Boot)

1. Navigate to backend directory

2. Configure **MySQL database** in `application.properties`

3. Run the backend

```bash
mvn spring-boot:run
```

Backend will start at:

```
http://localhost:8080
```

---

# 💻 Frontend Setup (React)

1. Navigate to frontend directory

2. Install dependencies

```bash
npm install
```

3. Start the React app

```bash
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

# 📊 Application Workflow

1. User sets a **daily calorie goal**
2. User logs meals throughout the day
3. Calories are calculated and tracked
4. Meals can be **added or deleted**
5. Weekly progress is displayed in the **Progress tab**

---

# 🚀 Future Improvements

* User authentication (login/signup)
* Food calorie search API integration
* Macro nutrient tracking (Protein, Carbs, Fat)
* Charts for daily/monthly analytics

---
