import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductsList } from '../../components/products';
import { NoResults } from '../../components/category';

type Props = {};

const WomenCategoryPage = (props: Props) => {
    const { products, isLoading } = useProducts('/products?gender=mujeres');

    return (
        <ShopLayout title='Killer Diller | Mujeres' pageDescription='Productos para mujeres'>
            {
                isLoading ? <FullScreenLoading /> : 
                    products.length > 0 ? (
                        <Box>
                            <Typography variant='h1' component='h1'>Mujeres</Typography>
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

export default WomenCategoryPage;