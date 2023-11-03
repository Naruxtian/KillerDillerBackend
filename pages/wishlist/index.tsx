import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { WishlistItems } from '../../components/wishlist';
import { WishlistContext } from '../../context/wishlist';

type Props = {};

const WishlistPage = (props: Props) => {
    const { isLoaded, wishlist, numberOfItems } = useContext(WishlistContext);

    const router = useRouter();

    useEffect(() => {
        if (isLoaded && wishlist.length === 0) {
            router.replace('/wishlist/empty');
        }
    }, [isLoaded, wishlist, router]);

    if (!isLoaded || wishlist.length === 0) {
        return(<></>);
    }

    return (
        <ShopLayout 
            title={`Killer Diller | Lista de Deseos (${numberOfItems})`} 
            pageDescription='Tus productos deseados de Killer Diller.'
        >
            <Box
                sx={{
                    maxWidth: '900px',
                    mx: 'auto'
                }}
            >
                <Typography variant='h1'>Lista de Deseos</Typography>

                <Box sx={{ mt: 1 }}>
                    <WishlistItems editable />
                </Box>
            </Box>
        </ShopLayout>
    );
};

export default WishlistPage;