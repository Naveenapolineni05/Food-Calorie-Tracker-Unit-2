import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import { Link } from "react-router-dom";


function NavBar() {
  const [value, setValue] = React.useState(0);

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
          to="/About"
          label="About"
          icon={<LunchDiningOutlinedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}

export default NavBar;
