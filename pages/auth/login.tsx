/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline, LoginOutlined, FacebookOutlined } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';
import { AuthContext } from '../../context/auth';
import { validations } from '../../utils';
import { GoogleIcon } from '../../assets';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const router = useRouter();
    const { loginUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
      getProviders().then(providers => {
        setProviders(providers);
      });
    }, []);
    
    const onUserLogin = async ({email, password}: FormData) => {
        setShowError(false);
        
        const isValidLogin = await loginUser(email, password);
        
        if (!isValidLogin) {
            setShowError(true);
            
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            
            return;
        }
        
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
        await signIn('credentials', { email, password });
    }

    return (
        <ShopLayout title='Killer Diller | Iniciar Sesión' pageDescription='Iniciar Sesión en Killer Diller'>
            <form onSubmit={handleSubmit(onUserLogin)} noValidate>
                <Box sx={{ maxWidth: 400, padding: '10px 20px', mx: 'auto' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography variant='h1' component='h1' textAlign='center'>Iniciar Sesión</Typography>
                            <Chip
                                sx={{mt: 1, display: showError ? 'flex' : 'none'}}
                                label='Credenciales incorrectas.'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
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
                                    minLength: {value: 6, message: 'La contraseña debe contener al menos 6 caracteres.'}
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                color='primary'
                                startIcon={<LoginOutlined />}
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='center'>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
                                <Link underline='always'>
                                    {"¿No tienes cuenta? Crea una"}
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
                                            {`Iniciar sesión con ${provider.name}`}
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

export default LoginPage;