import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProductionQuantityLimitsOutlined } from '@mui/icons-material';

type Props = {};

export const NoResults = (props: Props) => {
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <ProductionQuantityLimitsOutlined sx={{ fontSize: 100 }} />
            <Typography>No hay productos en esta categoría</Typography>
        </Box>
    );
};