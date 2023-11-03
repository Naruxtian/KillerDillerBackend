import React from 'react';
import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { ProductsList } from '../../components/products';
import { NoResults } from '../../components/category';

type Props = {};

const MenCategoryPage = (props: Props) => {
    const { products, isLoading } = useProducts('/products?gender=hombres');

    return (
        <ShopLayout title='Killer Diller | Hombres' pageDescription='Productos para hombres'>
            {
                isLoading ? <FullScreenLoading /> : 
                    products.length > 0 ? (
                        <Box>
                            <Typography variant='h1' component='h1'>Hombres</Typography>
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

export default MenCategoryPage;