import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Chip, Divider, Link, Typography } from '@mui/material';
import { PaymentOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartItems, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import { CartContext } from '../../context';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SummaryPage = () => {
    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address');
        }
    
    }, [router]);

    // If order has no items, return to cart page
    useEffect(() => {
        if (numberOfItems === 0) {
            router.push('/cart');
        }
    }, [numberOfItems, router]);

    const onCreateOrder = async () => {
        setIsPosting(true);

        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }
    }

    if (!shippingAddress) {
        return <></>;
    }

    const { firstName, lastName, address, address2 = '', zipCode, city, country, phone } = shippingAddress;

    return (
        <ShopLayout title={'Killer Diller | Resumen de pedido'} pageDescription={'Resumen de tu pedido de Killer Diller'}>
            <Box
                sx={{
                    maxWidth: '1440px',
                    mx: 'auto'
                }}
            >
                <Typography variant='h1' component='h1'>Resumen del pedido</Typography>

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
                        <CartItems />
                    </Box>

                    <Box>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography 
                                    variant='h2'
                                >
                                    Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Dirección de envío</Typography>
                                    <NextLink href='/checkout/address' passHref>
                                        <Link underline='always' textAlign='right'>
                                            Cambiar dirección
                                        </Link>
                                    </NextLink>
                                </Box>

                                <Typography>{firstName} {lastName}</Typography>
                                <Typography>{address}{address2 ? `, ${address2}` : ''}</Typography>
                                <Typography>{city}, {zipCode}</Typography>
                                <Typography>{country}</Typography>
                                <Typography>{phone}</Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Pedido</Typography>
                                    <NextLink href='/cart' passHref>
                                        <Link underline='always' textAlign='right'>
                                            Ver carrito
                                        </Link>
                                    </NextLink>
                                </Box>

                                <OrderSummary />

                                <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                    <Button 
                                        color='primary' 
                                        className='circular-btn black-btn' 
                                        fullWidth 
                                        onClick={onCreateOrder} 
                                        disabled={isPosting || numberOfItems === 0}
                                        startIcon={<PaymentOutlined />}
                                    >
                                        Pagar
                                    </Button>

                                    <Chip
                                        color='error'
                                        label={errorMessage}
                                        sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </ShopLayout>
    );
};

export default SummaryPage;