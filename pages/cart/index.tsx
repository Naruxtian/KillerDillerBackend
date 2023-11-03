import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';
import { CartItems, OrderSummary } from '../../components/cart';
import { ProductsSlider } from '../../components/products';
import { CartContext } from '../../context';
import { useProducts } from '../../hooks';

type Props = {};

const CartPage = (props: Props) => {
    const { isLoaded, cart, numberOfItems, createCart } = useContext(CartContext);
    const { products } = useProducts('/products');

    const router = useRouter();

    // Get products with the same tags
    const tags = Array.from(new Set(products.map(product => product.tags).flat()));
    const { products: relatedProducts } = useProducts(`/products/related?tags=${tags.toString()}`);

    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            router.replace('/cart/empty');
        }
    }, [isLoaded, cart, router]);

    if (!isLoaded || cart.length === 0) {
        return(<></>);
    }

    return (
        <ShopLayout 
            title={`Killer Diller | Carrito de Compras (${numberOfItems})`} 
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
                        <CartItems editable />
                    </Box>

                    <Box>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>Resumen</Typography>
                                
                                <Divider sx={{ my: 1 }} />

                                <OrderSummary />

                                <Box sx={{ mt: 3 }}>
                                    {/* <Button 
                                        color='primary' 
                                        className='circular-btn' 
                                        fullWidth 
                                        href='/checkout/address'
                                        startIcon={<PaymentOutlined />}
                                    >
                                        Proceder al pago
                                    </Button> */}
                                    <Button 
                                        color='primary' 
                                        className='circular-btn black-btn' 
                                        fullWidth
                                        startIcon={<WhatsApp />}
                                        onClick={createCart}
                                    >
                                        Contactar
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mt: 5 }}>
                <ProductsSlider 
                    products={relatedProducts.length > 0 ? relatedProducts : products}
                    rows={2} 
                    title={'PODRÍA INTERESARTE'} 
                />
            </Box>
        </ShopLayout>
    );
};

export default CartPage;