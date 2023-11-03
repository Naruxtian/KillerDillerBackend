import React from 'react';
import { GetServerSideProps } from 'next';
import { Box, capitalize, Typography } from '@mui/material';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { ShopLayout } from '../../components/layouts';
import { ProductsList } from '../../components/products';

type Props = {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
};

const SearchPage = ({ products, foundProducts, query }: Props) => {
    return (
        <ShopLayout title={`Killer Diller | ${capitalize(query)}`} pageDescription='Resultados de tu busqueda en Killer Diller'>
            <Box>
                <Typography variant='h1' component='h1'>Buscar Producto</Typography>

                {
                    foundProducts ? (
                        <Typography variant='h2' sx={{ mb: 1 }}>Resultados para: {capitalize(query)}</Typography>
                    ) : (
                        <Typography variant='h2' sx={{ mb: 1 }}>No hay resultados para: {capitalize(query)}</Typography>
                    )
                }

                <ProductsList products={products} />
            </Box>
        </ShopLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };
    
    if (query.trim().length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query);
    const foundProducts = products.length > 0;

    if (!foundProducts) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            foundProducts,
            query
        }
    }
}

export default SearchPage;