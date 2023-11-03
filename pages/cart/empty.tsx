import React, { useContext, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

export const EmptyCartPage = () => {
    const { isLoaded, cart } = useContext(CartContext);

    const router = useRouter();

    useEffect(() => {
        if (isLoaded && cart.length > 0) {
            router.replace('/cart');
        }
    }, [isLoaded, cart, router]);

    if (!isLoaded || cart.length > 0) {
        return(<></>);
    }

    return (
        <ShopLayout title={'Killer Diller | Carrito Vacío'} pageDescription={'No hay productos en tu carrito de compras'} >
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography>Tu carrito de compras está vacío</Typography>
                    <NextLink href='/' passHref>
                        <Link typography='h5' underline='always'>Regresar</Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    );
};

export default EmptyCartPage;
