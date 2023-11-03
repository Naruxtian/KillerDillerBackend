import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductsList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';
import { NoResults } from '../../components/category';

type Props = {};

const KidsCategoryPage = (props: Props) => {
    const { products, isLoading } = useProducts('/products?gender=niños');

    return (
        <ShopLayout title='Killer Diller | Niños' pageDescription='Productos para niños'>
            {
                isLoading ? <FullScreenLoading /> : 
                    products.length > 0 ? (
                        <Box>
                            <Typography variant='h1' component='h1'>Niños</Typography>
                            <Typography variant='h2' sx={{ mb: 1 }}>Todos los Productos</Typography>

                            <ProductsList products={products} />
                        </Box>
                    ) : (
                        <NoResults />
                    )
            }
        </ShopLayout>
    );
};

export default KidsCategoryPage;