import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" component="header">
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Food Calorie Tracker 🍎
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
