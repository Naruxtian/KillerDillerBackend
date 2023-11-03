import React, { useContext, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, Button, capitalize, Chip, Grid, Rating, Tab, Tabs, Typography } from '@mui/material';
import { AddShoppingCartOutlined, FavoriteBorderOutlined, WhatsApp } from '@mui/icons-material';
import { ShopLayout } from '../../components/layouts';
import { ProductsSlider, ProductSlideshow } from '../../components/products';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct, TValidSizes } from '../../interfaces';
import { useProducts } from '../../hooks';
import { CartContext } from '../../context';
import { WishlistContext } from '../../context/wishlist';

type Props = {
    product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
    const { addProductToCart } = useContext(CartContext);
    const { addProductToWishlist } = useContext(WishlistContext);

    // Filter products with the same tags
    const tags = product.tags.map(tag => tag);
    const { products } = useProducts('/products');
    const relatedProducts = products.filter(product => product.tags.some(tag => tags.includes(tag)));

    const [selectedTab, setSelectedTab] = useState('description');
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

    const handleTabChange = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setSelectedTab(newValue);
    };
    
    return (
        <ShopLayout title={`Killer Diller | ${product.title}`} pageDescription={product.description}>
            <Box
                sx={{
                    maxWidth: '1440px',
                    margin: '0 auto'
                }}            
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <ProductSlideshow images={product.images} />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <Box display='flex' flexDirection='column' sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            {/* Titles */}
                            <Typography variant='h1' component='h1'>{product.title}</Typography>
                            {
                                product.fit && (
                                    <Typography variant='subtitle2' textTransform='uppercase'>{product.fit} FIT</Typography>
                                )
                            }
                            {
                                product.size && (
                                    <Typography variant='subtitle2'>Talla: {capitalize(product.size)}</Typography>
                                )
                            }
                            <Box 
                                display='flex' 
                                alignItems='center' 
                                sx={{
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: {  md: '20px' },
                                    justifyContent: { xs: 'center', md: 'left' }
                                }}
                            >
                                <Typography 
                                    variant='subtitle1' 
                                    component='h2'
                                    sx={{
                                        textDecoration: product.discount > 0 ? 'line-through' : 'none'
                                    }}
                                >
                                    ${product.price} MXN
                                </Typography>
                                {
                                    product.discount > 0 && (
                                        <Box
                                            display='flex'
                                            gap='15px'
                                            alignItems='center'
                                        >
                                            <Typography variant='subtitle1' component='h2'>${product.price - product.discount} MXN</Typography>
                                            <Chip
                                                color='primary'
                                                size='small'
                                                label='Descuento'
                                            />
                                        </Box>
                                    )
                                }
                            </Box>

                            {/* Condition */}
                            <Box 
                                display='flex'
                                justifyContent='center'
                                sx={{
                                    mt: 2,
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: { xs: '10px', md: '30px', lg: '50px' }
                                }}
                            >
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='center'
                                >
                                    <Typography component="legend" variant='subtitle2'>Condición del exterior</Typography>
                                    <Box display='flex' alignItems='center' gap='5px'>
                                        <Typography variant='body2'>{product.externalCondition}</Typography>
                                        <Rating 
                                            name="external-condition" 
                                            precision={0.1}
                                            value={product.externalCondition / 5} 
                                            max={1} 
                                            readOnly 
                                        /> 
                                    </Box>
                                </Box>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    alignItems='center'
                                >
                                    <Typography component="legend" variant='subtitle2'>Condición del interior</Typography>
                                    <Box display='flex' alignItems='center' gap='5px'>
                                        <Typography variant='body2'>{product.internalCondition}</Typography>
                                        <Rating 
                                            name="internal-condition" 
                                            precision={0.1}
                                            value={product.internalCondition / 5} 
                                            max={1} 
                                            readOnly 
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            {
                                (!product.isSold) ? (
                                    <Box
                                        display='flex'
                                        flexDirection='column'
                                        gap='15px'
                                        sx={{
                                            mt: 3,
                                            mx: 'auto',
                                            width: '200px'
                                        }}
                                    >
                                        <Button 
                                            color='primary'
                                            variant='outlined'
                                            className='circular-btn'
                                            startIcon={<FavoriteBorderOutlined />}
                                            onClick={onAddToWishlist}
                                        >
                                            Agregar a favoritos
                                        </Button>

                                        <Button 
                                            color='primary' 
                                            className='circular-btn black-btn'
                                            startIcon={<AddShoppingCartOutlined />}
                                            onClick={onAddToCart}
                                        >
                                            Agregar al carrito
                                        </Button>
                                    </Box>

                                ) : (
                                    <Chip 
                                        label='Producto no disponible' 
                                        color='error' 
                                        variant='outlined' 
                                        sx={{ mt: 3, mx: 'auto' }}
                                    />
                                )
                            }

                            {/* Description and information tabs */}
                            <Box
                                sx={{
                                    mt: 3,
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleTabChange}
                                    variant='scrollable'
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    sx={{
                                        '.MuiTabs-scrollButtons.Mui-disabled': {
                                            opacity: 0.3
                                        }
                                    }}
                                >
                                    <Tab label='DESCRIPCIÓN' value='description' />
                                    {
                                        product.information.map((info, index) => (
                                            <Tab label={info.title} value={`${info._id}`} key={index} />
                                        ))
                                    }
                                </Tabs>
                            </Box>

                            <Box sx={{ mt: 1, textAlign: 'center' }}>
                                {
                                    selectedTab === 'description' && (
                                        <Typography variant='body2'>{product.description}</Typography>
                                    )
                                }

                                {
                                    product.information.map((info, index) => (
                                        selectedTab === `${info._id}` && (
                                            <Typography variant='body2' key={index}>{info.description}</Typography>
                                        )
                                    ))
                                }

                            </Box>
                        </Box>

                        <Box
                            sx={{
                                mt: 3,
                                mx: 'auto',
                                textAlign: 'center'
                            }}
                        >
                            <WhatsAppButton product={product.slug} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    mt: 5
                }}
            >
                <ProductsSlider 
                    products={relatedProducts || products}
                    rows={2}
                    title={'PRODUCTOS SIMILARES'}
                />
            </Box>
        </ShopLayout>
    );
};

type WhatsAppButtonProps = {
    product: string;
};

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product }) => {
    const number = '+524774409975';
    const message = `Hola, quiero más información del producto: ${process.env.NEXT_PUBLIC_HOST_NAME}/product/${product}`;

    return (
        <Button
            color='primary'
            className='circular-btn black-btn'
            startIcon={<WhatsApp />}
            sx={{
                maxWidth: '300px'
            }}
            href={`https://api.whatsapp.com/send?phone=${number}&text=${encodeURI(message)}&app_absent=0`}
            target='blank'
        >
            Obtener más información
        </Button>
    );
};

export const getStaticPaths: GetStaticPaths = async(ctx) => {
    const productSlugs = await dbProducts.getAllProductSlugs();
  
    return {
        paths: productSlugs.map(({ slug }) => ({
            params: { slug }
        })),
        fallback: 'blocking'
    }
};
  
export const getStaticProps: GetStaticProps = async({ params }) => {
    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug(slug);
  
    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
  
    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
};

export default ProductPage;