import React from "react";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

function CustomizedProgressBar(props) {

  const {goal,dailyCalories}= props;

  const goalPercentCompleted = () => {
    const percentageCompletion=(dailyCalories/goal)*100;
    if(percentageCompletion > 100){
      return 100;
    }
    else{
      return percentageCompletion;
    }
  }

  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <h3>Total Calories</h3>
        <h4>{dailyCalories}</h4>
     <BorderLinearProgress variant="determinate" value={goalPercentCompleted()} />
     <h4 style={{ textAlign: 'end' }}>Goal {goal}</h4>
    </Stack>
  );
}
export default CustomizedProgressBar;