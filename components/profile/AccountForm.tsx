import React, { useContext, useEffect } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IUser } from '../../interfaces';
import { validations } from '../../utils';
import { SaveAsOutlined } from '@mui/icons-material';
import { AuthContext } from '../../context';

type Props = {
    user: IUser,
    isOnCheckout?: boolean
};

type FormData = {
    name: string;
    email: string;
    password?: string;
    passwordConfirmation?: string;
};

export const AccountForm = ({ user, isOnCheckout = false }: Props) => {
    const { _id: userId, name, email } = user;

    const { updateUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    });

    useEffect(() => {
      reset({ name, email });
    }, [name, email, reset]);

    const handleFormSubmit = async (data: FormData) => {
        if (data.password === '') {
            delete data.password;
        }
        
        delete data.passwordConfirmation;

        updateUser(userId, data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Nombre'
                        variant='filled'
                        fullWidth
                        {
                            ...register('name', {
                                required: 'El campo del nombre es requerido.',
                                minLength: {value: 2, message: 'El nombre debe contener al menos 2 caracteres.'}
                            })
                        }
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Correo electrónico'
                        variant='filled'
                        fullWidth
                        {
                            ...register('email', {
                                required: 'El campo del correo electrónico es requerido.',
                                validate: validations.isEmail
                            })
                        }
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Contraseña'
                        variant='filled'
                        type='password'
                        fullWidth
                        {
                            ...register('password', {
                                minLength: { value: 6, message: 'La contraseña debe contener al menos 6 caracteres.' }
                            })
                        }
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Confirmar contraseña'
                        variant='filled'
                        type='password'
                        fullWidth
                        {
                            ...register('passwordConfirmation', {
                                validate: (value) => {
                                    if (value !== watch('password')) {
                                        return 'Las contraseñas no coinciden.';
                                    }

                                    return true;
                                }
                            })
                        }
                        error={!!errors.passwordConfirmation}
                        helperText={errors.passwordConfirmation?.message}
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
                <Button 
                    color='primary' 
                    className='circular-btn black-btn'
                    size='large' 
                    type='submit'
                    startIcon={<SaveAsOutlined />}
                >
                    Guardar cambios
                </Button>
            </Box>
        </form>
    );
};