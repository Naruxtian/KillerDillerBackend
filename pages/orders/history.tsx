import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Pedido', width: 100, headerAlign: 'center', align: 'center' },
    { field: 'fullName', headerName: 'Recibe', width: 300, headerAlign: 'center', align: 'center' },
    {
        field: 'paid',
        headerName: 'Pago',
        description: 'Shows whether the order is paid or not',
        width: 200,
        headerAlign: 'center', 
        align: 'center',
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid 
                    ? <Chip color='success' label='Pagado' variant='outlined' />
                    : <Chip color='error' label='No pagado' variant='outlined' />
            )
        }
    },
    {
        field: 'order',
        headerName: 'Pedido',
        width: 200,
        sortable: false,
        headerAlign: 'center', 
        align: 'center',
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline='always'>
                        Ver pedido
                    </Link>
                </NextLink>
            )
        }
    }
];

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({orders}) => {
    const rows = orders.map((order, index) => ({
        id: index + 1,
        fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        paid: order.isPaid,
        orderId: order._id
    }))

    return (
        <ShopLayout title={'Killer Diller | Historial de pedidos'} pageDescription={"Tu historial de pedidos en Killer Diller"}>
            <Box
                sx={{
                    maxWidth: '1440px',
                    mx: 'auto'
                }}
            >
                <Typography variant='h1' component='h1'>Historial de pedidos</Typography>

                <Grid container className='fadeIn'>
                    <Grid item xs={12} sx={{ height: 650, width: '100%', mt: 2 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />

                    </Grid>
                </Grid>
            </Box>
        </ShopLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const session: any = await getSession({req});

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id);

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage;