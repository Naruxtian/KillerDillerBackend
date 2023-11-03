import React, { useContext, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IUser, ShippingAddress } from '../../interfaces';
import { AddHomeOutlined } from '@mui/icons-material';
import { AuthContext } from '../../context';

type Props = {
    user: IUser;
};

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

export const AddressForm = ({ user }: Props) => {
    const { _id: userId, address } = user;

    const { updateUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
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
      reset(address);
    }, [address, reset]);
    
    const handleFormSubmit = async (data: FormData) => {
        const formData = {
            address: {
                ...data
            }
        }

        updateUser(userId, formData);
    };
    
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
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
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
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
    );
};