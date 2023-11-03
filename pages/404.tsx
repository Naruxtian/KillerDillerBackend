import React from 'react';
import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts'

const Custom404Page = () => {
    return (
        <ShopLayout title={'Killer Diller | Página No Encontrada'} pageDescription={'Esta página no existe'}>
            <Box 
                display='flex' 
                flexDirection='column'
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)'
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
                >
                    <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
                    <Typography fontSize={20} marginLeft={2}>Página No Encontrada</Typography>
                </Box>

                <Box
                    sx={{
                        mt: 1
                    }}
                >
                    <NextLink href='/' passHref>
                        <Link typography='h5' underline='always'>Regresar</Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    );
}

export default Custom404Page;