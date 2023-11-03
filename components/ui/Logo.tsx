import React from 'react';
import NextLink from 'next/link';
import { Link, Typography } from '@mui/material';

type Props = {};

export const Logo = (props: Props) => {
    return (
        <NextLink href='/' passHref>
            <Link display='flex' alignItems='center' flexWrap='nowrap'>
                <Typography 
                    sx={{ fontSize: { xs: '25px', sm: '30px', md: '35px' } }} 
                    fontWeight={900}
                >
                    KILLER
                </Typography>
                <Typography 
                    sx={{ 
                        fontSize: { xs: '25px', sm: '30px', md: '35px' },
                        ml: 1.0
                    }} 
                    fontWeight={900}
                >
                    DILLER
                </Typography>
            </Link>
        </NextLink>
    );
};