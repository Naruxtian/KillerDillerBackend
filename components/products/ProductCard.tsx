import React, { useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import styles from './ProductCard.module.css';
import { IProduct } from '../../interfaces';

interface Props {
    product: IProduct | any;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Box>
            <Card
                sx={{
                    maxWidth: '300px',
                    maxHeight: '450px'
                }}
            >
                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            {
                                product.isSold && (
                                    <Chip
                                        color='primary'
                                        label='No disponible'
                                        sx={{
                                            position: 'absolute', 
                                            zIndex: 99, 
                                            top: '10px', 
                                            left: '10px'
                                        }}
                                    />
                                )
                            }
                            <CardMedia 
                                component='img'
                                image={product.images[0]}
                                alt={product.title}
                                className='fadeIn'
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>

            <Box 
                className='fadeIn'
                sx={{ 
                    mt: 1, 
                    display: isImageLoaded ? 'block' : 'none',
                    maxWidth: '300px'
                }} 
            >
                <Typography className={styles['product-card__title']} fontWeight={700}>{product.title}</Typography>
                <Typography fontWeight={500}>${product.price}</Typography>
            </Box>
        </Box>  
    );
}
