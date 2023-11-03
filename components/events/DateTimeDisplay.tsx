import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  value: number;
  type: string;
}

export const DateTimeDisplay = ({ value, type } : Props) => {
  return (
    <Box
      textAlign='center'
      sx={{
        fontSize: { xs: '30px', md: '40px' }
      }}
    >
      <Typography 
        padding='0 16px' 
        fontWeight={700} 
        sx={{ 
          fontSize: { xs: '15px', md: '20px' } 
        }}
        suppressHydrationWarning
      >
          {/* { value < 10 ? `0${value}` : value } */}
          {/* { type !== 'Días' && value < 10 ? `0${value}` : value } */}
          { value }
        </Typography>
      <Typography 
        padding='0 16px' 
        sx={{ 
          fontSize: { xs: '10px', md: '15px' } 
        }}>
          {type}
        </Typography>
    </Box>
  );
};