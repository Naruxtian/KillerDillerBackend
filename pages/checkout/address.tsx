import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AddHomeOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
};

const AddressPage = () => {
    const router = useRouter();
    const { updateAddress, shippingAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zipCode: '',
            city: '',
            country: '',
            phone: '',
        }
    });

    useEffect(() => {
      reset(shippingAddress);
    }, [reset, shippingAddress]);
    
    const onAddressSubmit = (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    };

    return (
        <ShopLayout title={'Killer Diller | Dirección'} pageDescription={'Dirección de envío para tus pedidos en Killer Diller'}>
            <Box 
                sx={{ 
                    maxWidth: { sm: '800px' }, 
                    mx: 'auto'
                }}
            >
                <form onSubmit={handleSubmit(onAddressSubmit)}>
                    <Typography variant='h1' component='h1'>Dirección</Typography>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Nombre'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('firstName', {
                                        required: 'El campo del nombre es requerido.',
                                        minLength: {value: 2, message: 'El nombre debe contener al menos 2 caracteres.'}
                                    })
                                }
                                InputLabelProps={{ shrink: watch('firstName') ? true : false }}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Apellido'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('lastName', {
                                        required: 'El campo del apellido es requerido.',
                                        minLength: {value: 2, message: 'El apellido debe contener al menos 2 caracteres'}
                                    })
                                }
                                InputLabelProps={{ shrink: watch('lastName') ? true : false }}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Calle'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('address', {
                                        required: 'El campo de la calle es requerido.'
                                    })
                                }
                                InputLabelProps={{ shrink: watch('address') ? true : false }}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Calle 2 (opcional)'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('address2')
                                }
                                InputLabelProps={{ shrink: watch('address2') ? true : false }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Código Postal'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('zipCode', {
                                        required: 'El campo del código postal es requerido.'
                                    })
                                }
                                InputLabelProps={{ shrink: watch('zipCode') ? true : false }}
                                error={!!errors.zipCode}
                                helperText={errors.zipCode?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Ciudad'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('city', {
                                        required: 'El campo de la ciudad es requerido.'
                                    })
                                }
                                InputLabelProps={{ shrink: watch('city') ? true : false }}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='filled'
                                label='País'
                                fullWidth
                                {
                                    ...register('country', {
                                        required: 'El campo del país es requerido.'
                                    })
                                }
                                InputLabelProps={{ shrink: watch('country') ? true : false }}
                                error={!!errors.country}
                                helperText={errors.country?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label='Número de teléfono'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('phone', {
                                        required: 'El campo del número de teléfono es requerido.'
                                    })
                                }
                                InputLabelProps={{ shrink: watch('phone') ? true : false }}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                        <Button 
                            color='primary' 
                            className='circular-btn black-btn'
                            size='large' 
                            type='submit'
                            startIcon={<AddHomeOutlined />}
                        >
                            Guardar dirección
                        </Button>
                    </Box>
                </form>
            </Box>
        </ShopLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//     const {token = ''} = req.cookies;
//     let userId = '';
//     let isValidToken = false;

//     try {
//         userId = await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage;