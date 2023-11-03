import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Cookie from 'js-cookie';
import { useSnackbar } from 'notistack';
import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { CartItems, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts'
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { CartContext } from '../../context';

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({order}) => {
    const { shippingAddress } = order;
    
    const router = useRouter();
    const isNew = router.query['isNew'] === 'true';

    const [isLoading, setIsLoading] = useState(false);

    const { showOrderSuccessMessage } = useContext(CartContext);

    useEffect(() => {
        if (isNew && !isLoading) {
            showOrderSuccessMessage();
            setIsLoading(true);
        }
    }, [isLoading, isNew, showOrderSuccessMessage]);

    return (
        <ShopLayout title={`Killer Diller | Pedido: ${order._id}`} pageDescription={'Order Summary'}>
            <Box
                sx={{
                    maxWidth: '1440px',
                    mx: 'auto'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography 
                        variant='h1' 
                        component='h1'
                        sx={{
                            textAlign: { xs: 'center', sm: 'left' },
                            wordWrap: 'break-word'
                        }}
                    >
                        Pedido: {order._id}
                    </Typography>

                    {
                        order.isPaid ? (
                            <Chip
                                sx={{ my: 1, alignSelf: { xs: 'center', sm: 'flex-start' } }}
                                label="Pago realizado"
                                variant='outlined'
                                color='success'
                                icon={<CreditScoreOutlined />}
                            />
                        ) : (
                            <Chip
                                sx={{ my: 1, alignSelf: { xs: 'center', sm: 'flex-start' } }}
                                label="Pago pendiente"
                                variant='outlined'
                                color='error'
                                icon={<CreditCardOffOutlined />}
                            />
                        )
                    }
                </Box>

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
                        <CartItems products={order.orderItems} />
                    </Box>

                    <Box>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>
                                    Resumen ({ order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto' })
                                </Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Dirección de envío</Typography>
                                </Box>

                                <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                                <Typography>
                                    {shippingAddress.address} {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ''}
                                </Typography>
                                <Typography>{shippingAddress.city}, {shippingAddress.zipCode}</Typography>
                                <Typography>{shippingAddress.country}</Typography>
                                <Typography>{shippingAddress.phone}</Typography>

                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                    <Typography variant='subtitle1'>Pedido</Typography>
                                </Box>

                                <OrderSummary 
                                    orderValues={{
                                        numberOfItems: order.numberOfItems, 
                                        subtotal: order.subtotal, 
                                        discount: order.discount,
                                        total: order.total
                                    }} 
                                />
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </ShopLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const session: any = await getSession({ req });

    // Check there's a logged user
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    // If order does not exist, redirect
    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    // Check that order's user is the one that is logged in
    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }
 
    // All validations passed, return the order
    return {
        props: {
            order
        }
    }
}

export default OrderPage;