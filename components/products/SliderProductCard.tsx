import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardMedia, IconButton, Link, Typography } from '@mui/material';
import { FavoriteBorderOutlined, AddShoppingCartOutlined } from '@mui/icons-material';
import styles from './SliderProductCard.module.css';
import { ICartProduct, IProduct, TValidSizes } from '../../interfaces';
import { WishlistContext } from '../../context/wishlist';
import { CartContext } from '../../context';

interface Props {
    product: IProduct;
};

export const SliderProductCard: React.FC<Props> = ({ product }) => {
    const { addProductToWishlist } = useContext(WishlistContext);
    const { addProductToCart } = useContext(CartContext);

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        discount: product.discount,
        size: product.size as TValidSizes,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        isSold: product.isSold
    });

    const onAddToWishlist = () => {
        addProductToWishlist(tempCartProduct);
    };

    const onAddToCart = () => {
        addProductToCart(tempCartProduct);
    };

    return (
        <Card className={styles['slider-product-card']}>
            <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                <Link>
                    <CardMedia 
                        component='img'
                        image={product.images[0]}
                        alt={product.title}
                        className={styles['slider-product-card__image']}
                    />

                    <Box className={styles['slider-product-card__overlay']}>
                        <Typography className={styles['slider-product-card__overlay-title']} variant='h6' fontWeight={600}>
                            {product.title}
                        </Typography>
                        <Typography className={styles['slider-product-card__overlay-information']}>
                            Marca: {product.brand.name}
                        </Typography>
                        <Typography className={styles['slider-product-card__overlay-information']}>
                            Talla: {product.size}
                        </Typography>
                        <Typography className={styles['slider-product-card__overlay-information']}>
                            Precio: ${product.price} MXN
                        </Typography>

                        <Box
                            display='flex'
                            justifyContent='space-evenly'
                        >
                            <IconButton onClick={onAddToWishlist}>
                                <FavoriteBorderOutlined className={styles['slider-product-card__overlay-icon']} />
                            </IconButton>
                            <IconButton onClick={onAddToCart}>
                                <AddShoppingCartOutlined className={styles['slider-product-card__overlay-icon']} />
                            </IconButton>
                        </Box>
                    </Box>
                </Link>
            </NextLink>
        </Card>
    );
};