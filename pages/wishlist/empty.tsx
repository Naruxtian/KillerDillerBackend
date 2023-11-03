import React from 'react';
import NextLink from 'next/link';
import { LabelOffOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

export const EmptyWishlistPage = () => {
    return (
        <ShopLayout title={'Killer Diller | Lista Vacía'} pageDescription={'No hay productos en tu lista de deseos'} >
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <LabelOffOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Tu lista de deseos está vacía</Typography>
                    <NextLink href='/' passHref>
                        <Link typography='h5' underline='always'>Regresar</Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    );
};

export default EmptyWishlistPage;
