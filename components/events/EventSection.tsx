/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@mui/material';
import React from 'react';
import { IEvent } from '../../interfaces';
import { CountdownTimer } from './CountdownTimer';
import styles from './EventSection.module.css';

type Props = {
    event: IEvent
};

export const EventSection = ({ event }: Props) => {
    const eventDateInMilliseconds = new Date(event.date).getTime();

    return (
        <Box>
            <Typography 
                variant="h2"
                sx={{
                    fontSize: { xs: '30px', sm: '6vw' },
                    textAlign: { xs: 'center', sm: 'left'},
                    marginTop: '20px'
                }}
            >
                {event.title}
            </Typography>
            <Typography
                sx={{
                    fontSize: { md: '18px', lg: '22px' },
                    textAlign: { xs: 'center', sm: 'left' }
                }}
            >
                {event.description}
            </Typography>

            {
                event.date && (
                    <Box>
                        <CountdownTimer targetDate={eventDateInMilliseconds} />
                    </Box>
                )
            }

            <Box
                sx={{
                    width: '100%',
                    height: 'auto'
                }}
            >
                <img
                    src={event.image}
                    alt={event.title}
                    className={styles['event-image']}
                />
            </Box>
        </Box>
    );
};