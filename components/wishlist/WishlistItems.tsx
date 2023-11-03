import React, { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Link, Typography } from '@mui/material';
import { ICartProduct } from '../../interfaces';
import { AddShoppingCartOutlined } from '@mui/icons-material';
import { WishlistContext } from '../../context/wishlist';
import { CartContext } from '../../context';

interface Props {
    editable?: boolean;
    products?: ICartProduct[];
}

export const WishlistItems: React.FC<Props> = ({ editable = false, products }) => {
    const { wishlist, removeWishlistProduct } = useContext(WishlistContext);
    const { addProductToCart } = useContext(CartContext);

    const productsToShow = products ? products : wishlist;

    return (
        <>
            {
                productsToShow.map(product => (
                    <Box
                        key={product.slug + product.size}
                        display='flex'
                        gap={2}
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{
                            width: '100%',
                            flexDirection: { xs: 'column', sm: 'row' },
                            py: 2,
                            borderBottom: '1px solid #eee',
                            ':last-of-type': {
                                borderBottom: 'none'
                            }
                        }}
                    >
                        {/* Image */}
                        <Box>
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia 
                                            image={product.image}
                                            component='img'
                                            sx={{ 
                                                borderRadius: '5px',
                                                width: '100%',
                                                minWidth: '200px',
                                                height: '250px'
                                            }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Box>
                        
                        {/* Information */}
                        <Box 
                            display='flex' 
                            flexDirection='column'
                            sx={{
                                width: '100%',
                                maxWidth: '450px',
                                minHeigth: { md: '250px' },
                                alignItems: { xs: 'center', sm: 'flex-start' },
                                alignSelf: { xs: 'center', sm: 'flex-start' }
                            }}
                        >
                            <Typography 
                                variant='body1' 
                                sx={{
                                    textAlign: { xs: 'center', sm: 'left' }
                                }}
                            >
                                {product.title}
                            </Typography>
                            <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                            {/* {
                                editable ? (
                                    <ItemCounter
                                        currentValue={product.quantity}
                                        maxValue={10}
                                        updateQuantity={(value) => { onQuantityChange(product as ICartProduct, value) }}
                                    /> 
                                ) : (
                                    <Typography variant='subtitle2'>Quantity: {product.quantity}</Typography>
                                )
                            } */}
                            <Typography variant='subtitle1'>${product.price} MXN</Typography>

                            {
                                product.isSold && (
                                    <Typography variant='subtitle1' color='error'>Producto no disponible</Typography>
                                )
                            }
                        </Box>

                        {/* Actions */}
                        <Box
                            display='flex' 
                            alignItems='center' 
                            flexDirection='column'
                            sx={{
                                height: { md: '250px' },
                                alignSelf: { xs: 'center', sm: 'flex-start' }
                            }}
                        >
                            <Button 
                                color='primary' 
                                className='circular-btn black-btn'
                                startIcon={<AddShoppingCartOutlined />}
                                onClick={() => addProductToCart(product as ICartProduct)} 
                                disabled={product.isSold}
                                sx={{
                                    width: '200px',
                                    mb: 1
                                }}

                            >
                                Agregar al carrito
                            </Button>

                            {
                                editable && (
                                    <Button 
                                        variant='text' 
                                        color='error'
                                        onClick={() => removeWishlistProduct(product as ICartProduct)}
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        </Box>
                    </Box>
                ))
            }
        </>
    );
};
