/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, IconButton } from '@mui/material';
import { NavigateBeforeOutlined, NavigateNextOutlined } from '@mui/icons-material';

interface Props {
    images: string[];
}

export const ProductSlideshow: React.FC<Props> = ({ images }) => {
    return (
        <Carousel
            infiniteLoop={true}
            showThumbs={true}
            showStatus={false}
            autoPlay={true}
            swipeable={true}
            interval={5000}
            renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '0',
                        color: 'black',
                        padding: '5px',
                        zIndex: '10'
                    }}
                >
                    <NavigateBeforeOutlined sx={{ fontSize: 40 }} />
                </IconButton>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) => (
                <IconButton
                    onClick={onClickHandler}
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        right: '0',
                        color: 'black',
                        padding: '5px',
                        zIndex: '10'
                    }}
                >
                    <NavigateNextOutlined sx={{ fontSize: 40 }} />
                </IconButton>
            )}
            renderThumbs={() => images.map((image, index) => (
                <img 
                    key={`carousel-thumb-${index}`}
                    src={image}
                    alt={`carousel-thumb-${index}`}
                    style={{
                        width: '100%',
                        maxHeight: '100px',
                        objectFit: 'contain'
                    }}
                />
            ))}
        >
            {
                images.map((image, index) => {
                    return (
                        <Box key={`carousel-image-${index}`}>
                            <img
                                src={image}
                                alt={`carousel-${index}`}
                                style={{
                                    width: '100%',
                                    maxHeight: '650px',
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    )
                })
            }
        </Carousel>
    );
}
