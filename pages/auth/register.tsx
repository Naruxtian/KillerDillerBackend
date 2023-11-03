import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline, FacebookOutlined, PersonAddAltOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';
import { GoogleIcon } from '../../assets';

type FormData = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

const RegisterPage = () => {
    const router = useRouter();
    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showErrow, setShowErrow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
      getProviders().then(provs => {
        setProviders(provs);
      });
    }, []);

    const onRegisterForm = async ({ name, email, password, passwordConfirmation }: FormData) => {
        setShowErrow(false);

        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowErrow(true);
            setErrorMessage(message!);

            setTimeout(() => {
                setShowErrow(false);
            }, 3000);

            return;
        }

        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
        await signIn('credentials', { email, password });
    }

    return (
        <ShopLayout title='Killer Diller | Crear Cuenta' pageDescription='Crear cuenta en Killer Diller'>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ maxWidth: 400, padding: '10px 20px', mx: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip
                                sx={{ mt: 1, display: showErrow ? 'flex' : 'none' }}
                                label='Credenciales incorrectas.'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label='Nombre'
                                variant='filled'
                                fullWidth
                                {
                                    ...register('name', {
                                        required: 'El campo del nombre es requerido.',
                                        minLength: { value: 2, message: 'El nombre debe contener al menos 2 caracteres.' }
                                    })
                                }
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type='email'
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
                        <Grid item xs={12}>
                            <TextField
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                fullWidth
                                {...register('password', {
                                    required: 'El campo de la contraseña es requerido.',
                                    minLength: { value: 6, message: 'La contraseña debe contener al menos 6 caracteres.' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='primary'
                                startIcon={<PersonAddAltOutlined />}
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Registrarse
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} passHref>
                                <Link underline='always'>
                                    ¿Ya tienes cuenta? Inicia sesión
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center'>
                            <Divider sx={{width: '100%', mb: 2}} />

                            {
                                Object.values(providers).map((provider: any) => {
                                    if (provider.id === 'credentials') {
                                        return (
                                            <div key="credentials"></div>
                                        );
                                    }

                                    return (
                                        <Button
                                            key={provider.id}
                                            variant='outlined'
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                            startIcon={
                                                provider.id === 'google' ? (
                                                    <GoogleIcon fill='black' size={18} />
                                                ) : (
                                                    <FacebookOutlined />
                                                )
                                            }
                                        >
                                            {`Registrarse con ${provider.name}`}
                                        </Button>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </ShopLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
    const session = await getSession({ req });
    const { p = '/' } = query; 

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        };
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage;