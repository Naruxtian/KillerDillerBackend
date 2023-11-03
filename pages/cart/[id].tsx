import React from 'react';
import { GetServerSideProps } from 'next';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { CartItems, OrderSummary } from '../../components/cart';
import { useProducts } from '../../hooks';
import { dbCarts } from '../../database';
import { ICart } from '../../interfaces';

type Props = {
    cart: ICart
};

const CartDetailPage = ({ cart }: Props) => {
    const orderValues = {
        numberOfItems: cart.products.length, 
        subtotal: cart.products.reduce((previous, current) => current.price + previous, 0), 
        discount: cart.products.reduce((previous, current) => current.discount + previous, 0),
        total: 0
    };

    orderValues.total = orderValues.subtotal - orderValues.discount;

    return (
        <ShopLayout 
            title={`Killer Diller | Carrito de Compras (${cart.products.length})`} 
            pageDescription='Tu carrito de compras de Killer Diller.'
        >
            <Box
                sx={{
                    maxWidth: '1440px',
                    mx: 'auto'
                }}
            >
                <Typography variant='h1' component='h1'>Carrito de Compras</Typography>
                
                <Box
                    display='flex'
                    gap={2}
                    justifyContent='space-between'
                    sx={{ 
                        mt: 1,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '800px',
                            minWidth: { md: '500px' },
                        }}
                    >
                        <CartItems products={cart.products} />
                    </Box>

                    <Box>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>Resumen</Typography>
                                
                                <Divider sx={{ my: 1 }} />

                                <OrderSummary orderValues={orderValues} />
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </ShopLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;

    const cart = await dbCarts.getCartById(id.toString());

    if (!cart) {
        return {
            redirect: {
                destination: '/cart',
                permanent: false
            }
        }
    }

    // Format products to ICartProduct
    cart.products = cart.products.map((product) => {
        product.image = product.images![0];
        delete product.images;

        return product;
    });

    return {
        props: {
            cart
        }
    }
}

export default CartDetailPage;