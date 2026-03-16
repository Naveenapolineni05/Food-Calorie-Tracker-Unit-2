import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { Link } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  const getTabIndexFromPath = (path) => {
    switch (path) {
      case "/":
        return 0;
      case "/edit":
        return 1;
      case "/progress":
        return 2;
      case "/settings":
        return 3;
      case "/favorites":
        return 4;
      case "/about":
        return 5;
      default:
        return 0;
    }
  };

  const [value, setValue] = useState(getTabIndexFromPath(location.pathname));

  useEffect(() => {
    setValue(getTabIndexFromPath(location.pathname));
  }, [location.pathname]);

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          icon={<HomeOutlinedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/edit"
          label="Add Meal"
          icon={<RestaurantOutlinedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/progress"
          label="Progress"
          icon={<CheckCircleOutlineOutlinedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/settings"
          label="Settings"
          icon={<SettingsOutlinedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/favorites"
          label="Favorites"
          icon={<StarOutlineOutlinedIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/About"
          label="About"
          icon={<LunchDiningOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
