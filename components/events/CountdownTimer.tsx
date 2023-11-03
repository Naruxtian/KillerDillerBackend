import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCountdown } from '../../hooks';
import { DateTimeDisplay } from './DateTimeDisplay';

type Props = {
    targetDate: number;
};

export const CountdownTimer = ({ targetDate }: Props) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    const isDanger = days <= 3;

    if (days + hours + minutes + seconds <= 0) {
        return (
            <Box
                textAlign='center'
                margin='20px 0 25px 0'
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: '20px', sm: '30px' },
                    }}
                >
                    El evento ha finalizado
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: '15px', sm: '20px' },
                    }}
                >Mantente al tanto de nuestros nuevos eventos.</Typography>
            </Box>
        );
    }
    
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: isDanger ? 'red' : 'black',
                margin: '20px 0 25px 0'
            }}
        >
            <DateTimeDisplay value={days} type='Días' />
            <Typography fontWeight={900} alignSelf='flex-start'>:</Typography>
            <DateTimeDisplay value={hours} type='Horas' />
            <Typography fontWeight={900} alignSelf='flex-start'>:</Typography>
            <DateTimeDisplay value={minutes} type='Minutos' />
            <Typography fontWeight={900} alignSelf='flex-start'>:</Typography>
            <DateTimeDisplay value={seconds} type='Segundos' />
        </Box>
    );
};