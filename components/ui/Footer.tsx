import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { SocialIcon } from 'react-social-icons';
import { Logo } from './Logo';


const Footer = () => {
    return (
        <Box
            mt='30px'
            p='20px 0'
            sx={{
                borderTop: '2px solid black',
                width: '100%'
            }}
        >
            <Box
                width='80%'
                margin='auto'
                display='flex'
                justifyContent='space-between'
                sx={{
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: '20px', md: '0' }
                }}
            >
                <Box 
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                >
                    <Logo />

                    <Box
                        display='flex'
                        gap='20px'
                    >
                        <SocialIcon
                            url='https://www.facebook.com/killerdillerstorebaja/'
                            bgColor='black'
                        />
                        <SocialIcon
                            url='http://instagram.com/killerdillerstore/'
                            bgColor='black'
                        />
                    </Box>
                </Box>

                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    textAlign='center'
                    gap='15px'
                    sx={{
                        width: { md: 'clamp(20%, 25%, 30%)' }
                    }}
                >
                    <Typography variant='h5' fontWeight='bold'>Nosotros</Typography>
                    <Typography>Términos y Condiciones</Typography>
                    <Typography>Política de Privacidad</Typography>
                </Box>

                <Box 
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    textAlign='center'
                    gap='15px'
                    sx={{
                        width: { md: 'clamp(20%, 25%, 30%)' }
                    }}
                >
                    <Typography variant='h5' fontWeight='bold'>Contacto</Typography>
                    <Typography>Av. Panorama 810, Valle del Campestre, 37150. León, Guanajuato, México</Typography>
                    <Typography>ventas@killerdiller.com.mx</Typography>
                    <Typography>+52 (477) 440 9975</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Footer;