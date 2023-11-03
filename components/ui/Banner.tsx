import React from 'react';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

type Props = {};

export const Banner = (props: Props) => {
    return (
        <Box 
            width={'100%'} 
            display='flex' 
            flexDirection='column'
            marginBottom={'20px'}
        >
            <Box 
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                gap='20vw'
            >
                <Typography 
                    fontWeight={700}
                    sx={{
                        fontSize: { xs: '40px', sm: '12vw' },
                    }}
                >
                    MODA
                </Typography>
                <Typography
                    textAlign='center'
                    sx={{ 
                        display: { xs: 'none', md: 'block' },
                        maxWidth: '30vw',
                        fontSize: { md: '18px', lg: '22px' },
                    }}
                >
                    Somos una plataforma de Moda Circular, fomentamos e impulsamos una nueva generación de consumidores sustentables.
                </Typography>
            </Box>
            
            <Marquee
                gradient={false}
                speed={200}
            >
                <Typography
                    fontWeight={700} 
                    textAlign='center'
                    sx={{
                        marginTop: { xs: '-15px', sm: '-20px', md: '-40px', lg: '-55px' },
                        fontSize: { xs: '40px', sm: '12vw' },
                    }}
                >
                    RESPONSABLE
                </Typography>
            </Marquee>

            <Typography
                fontSize={'18px'}
                textAlign='center'
                sx={{ display: {xs: 'block', md: 'none'}}}
            >
                Somos una plataforma de Moda Circular, fomentamos e impulsamos una nueva generación de consumidores sustentables.
            </Typography>
        </Box>
    );
};