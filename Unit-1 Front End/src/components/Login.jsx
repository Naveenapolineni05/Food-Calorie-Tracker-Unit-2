import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { DataContext } from "../context/DataContext";

function Login() {
    const { login } = useContext(DataContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        setLoading(true);
        setError("");

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error || "Login failed");
        }

        setLoading(false);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Food Calorie Tracker 🍎
                </Typography>

                <Typography variant="h6" align="center" color="textSecondary">
                    Login to your account
                </Typography>

                {error && (
                    <Typography color="error" variant="body2" align="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </Stack>
        </Box>
    );
}

export default Login;