import React, { useCallback, useEffect, useState } from 'react';
import { Autocomplete, Box, Button, capitalize, Chip, Divider, TextField, Typography, useMediaQuery } from '@mui/material';
import { Tune, ExpandMoreOutlined, ExpandLessOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { IColor, IProduct } from '../../interfaces';
import { ProductCard } from './';
import styles from './ProductsList.module.css';

interface Props {
    products: IProduct[];
}

type Filters = {
    category: string;
    brand: string;
    size: string;
    color: string;
    tag: string;
}

const filtersInitialState: Filters = {
    category: '',
    brand: '',
    size: '',
    color: '',
    tag: ''
};

export const ProductsList: React.FC<Props> = ({ products }) => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, setFilters] = useState(filtersInitialState);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const [isSortExpanded, setIsSortExpanded] = useState(false);
    const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false);

    const categories = Array.from(new Set(filteredProducts.map(product => product.category)));

    // Sort sizes to be shown in ascending size order
    const sizes = Array.from(new Set(filteredProducts.map(product => product.size))).sort((a, b) => {
        const sizesOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Unitalla'];

        return sizesOrder.indexOf(a) - sizesOrder.indexOf(b);
    });

    // Flatten array of colors array and remove duplicate colors
    const colors = Array.from(new Set(filteredProducts.map(product => product.colors))).flat().filter((product, index, self) => {
        return index === self.findIndex(p => (
            p._id === product._id && p.name === product.name
        ));
    });

    const tags = Array.from(new Set(filteredProducts.map(product => product.tags).flat()));

    const allBrands = Array.from(new Set(products.map(product => product.brand))).filter((product, index, self) => {
        return index === self.findIndex(p => (
            p._id === product._id && p.name === product.name
        ));
    });

    const brands = Array.from(new Set(filteredProducts.map(product => product.brand))).filter((product, index, self) => {
        return index === self.findIndex(p => (
            p._id === product._id && p.name === product.name
        ));
    });

    const filterProducts = useCallback(() => {
        const { category, brand, size, color, tag } = filters;

        // Filter products by category, brand, size, color, and tag
        const filteredProducts = products.filter(product => {
            return (
                (category ? product.category === category : true) &&
                (brand ? product.brand._id === brand : true) &&
                (size ? product.size === size : true) &&
                (color ? product.colors.some(c => c._id === color) : true) &&
                (tag ? product.tags.some(t => t === tag) : true)
            );
        });

        setFilteredProducts(filteredProducts);
    }, [products, filters]);
    
    useEffect(() => {
      filterProducts();
    }, [filters, filterProducts]);

    const handleFilterChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name, value } = event.target as HTMLInputElement;

        const updatedFilters = { ...filters, [name]: value };

        setFilters(updatedFilters);
    };

    const handleColorChange = (colorId: string) => {
        const updatedFilters = { ...filters, color: colorId };

        setFilters(updatedFilters);
    }

    const resetFilters = () => {
        setFilters(filtersInitialState);
        setFilteredProducts(products);
    };

    const sortProducts = (by: string) => {
        let sortedProducts = [...filteredProducts];

        switch (by) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'latest':
                sortedProducts.sort((a, b) => new Date(b!.updatedAt!).getTime() - new Date(a!.updatedAt!).getTime());
                break;
            default:
                sortedProducts = products;
                break;
        }

        setFilteredProducts(sortedProducts);
    };

    return (
        <Box display='flex' flexDirection='column'>
            {/* Result count and filter buttons */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '20px',
                    mt: 2,
                    mb: 3
                }}
            >
                <Typography
                    component='h3'
                    sx={{
                        fontSize: '20px',
                        color: '#6a6969'
                    }}
                >
                    {`${filteredProducts.length} ${filteredProducts.length > 1 ? 'productos' : 'producto'}`} 
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '20px',
                    }}
                >
                    <Button
                        color='info'
                        startIcon={<Tune />}
                        onClick={() => setIsFilterWindowOpen(!isFilterWindowOpen)}
                    >
                        { 
                            isFilterWindowOpen ? isMobile ? 
                                'Ocultar' : 'Ocultar filtros' 
                                    : isMobile ? 'Filtrar' : 'Mostrar filtros'
                        }
                    </Button>

                    <Box>
                        <Button
                            color='primary'
                            className='black-btn'
                            endIcon={isSortExpanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
                            onClick={() => setIsSortExpanded(!isSortExpanded)}
                            sx={{
                                display: { xs: 'none', sm: 'flex' }
                            }}
                        >
                            Ordenar por
                        </Button>

                        {
                            isSortExpanded && !isMobile && (
                                <motion.div
                                    className={styles['sort-box']}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('featured')}
                                    >
                                        Destacados
                                    </Button>
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('latest')}
                                    >
                                        Más reciente
                                    </Button>
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('price-asc')}
                                    >
                                        Menor precio
                                    </Button>
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('price-desc')}
                                    >
                                        Mayor precio
                                    </Button>
                                </motion.div>
                            )
                        }
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {/* Filter section */}
                {
                    isFilterWindowOpen && (
                        <motion.div
                            className={styles['filters-box']}
                            initial={{ opacity: 0, x: -10, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: 'auto' }}
                            exit={{ opacity: 0, x: -10, width: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* On smaller screens, sort options will be shown in filter menu */}
                            <Box
                                sx={{
                                    display: { xs: 'flex', sm: 'none' },
                                    flexDirection: 'column',
                                    gap: '10px',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    component='h4'
                                    fontSize='18px'
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    Ordenar por
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row', md: 'column' }
                                    }}
                                >
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('featured')}
                                    >
                                        Destacados
                                    </Button>
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('latest')}
                                    >
                                        Más reciente
                                    </Button>
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('price-asc')}
                                    >
                                        Menor precio
                                    </Button>
                                    <Button
                                        color='info'
                                        fullWidth
                                        onClick={() => sortProducts('price-desc')}
                                    >
                                        Mayor precio
                                    </Button>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2, display: { xs: 'block', sm: 'none' } }} />

                            {/* Category */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    component='h4'
                                    fontSize='18px'
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    Categoría
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    {
                                        categories.map(category => (
                                            <Button
                                                key={category}
                                                color={filters.category === category ? 'primary' : 'info'}
                                                className={filters.category === category ? 'black-btn' : ''}
                                                name='category'
                                                value={category}
                                                sx={{
                                                    textAlign: 'left'
                                                }}

                                                onClick={handleFilterChange}
                                            >
                                                {capitalize(category)}
                                            </Button>
                                        ))
                                    }
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Brand */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    component='h4'
                                    fontSize='18px'
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    Marca
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <Autocomplete
                                        options={brands || []}
                                        value={allBrands.find(brand => brand._id === filters.brand) || null}
                                        defaultValue={null}
                                        getOptionLabel={(option) => option.name}
                                        fullWidth
                                        renderInput={(params) => (
                                            <TextField {...params} label="Buscar" variant='outlined' size='small' />
                                        )}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                // eslint-disable-next-line react/jsx-key
                                                <Chip
                                                    label={option.name}
                                                    {...getTagProps({ index })}
                                                    color="primary"
                                                    size='small'
                                                    sx={{ ml: 1, mt: 1 }}
                                                />
                                            ))
                                        }
                                        onChange={(event, value) => {
                                            if (value) {
                                                setFilters({ ...filters, brand: value._id })
                                            } else {
                                                setFilters({ ...filters, brand: '' })
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/*  Size */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    component='h4'
                                    fontSize='18px'
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    Talla
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    {
                                        sizes.map(size => (
                                            <Button
                                                key={size}
                                                color={filters.size === size ? 'primary' : 'info'}
                                                className={filters.size === size ? 'black-btn' : ''}
                                                name='size'
                                                value={size}
                                                sx={{
                                                    textAlign: 'left'
                                                }}
                                                onClick={handleFilterChange}
                                            >
                                                {capitalize(size)}
                                            </Button>
                                        ))
                                    }
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/*  Color */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    component='h4'
                                    fontSize='18px'
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    Color
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        gap: '15px'
                                    }}
                                >
                                    {
                                        colors.map((color: IColor, index: number) => (
                                            <Button
                                                key={`${color._id}-${index}`}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    width: 'fit-content',
                                                    flex: { xs: '40%', sm: '15%', md: '40%' },
                                                    cursor: 'pointer'
                                                }}
                                                color={filters.color === color._id ? 'primary' : 'info'}
                                                className={`color-btn ${filters.color === color._id ? 'active' : ''}`}
                                                name='color'
                                                value={color._id}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                    onClick={() => handleColorChange(color._id)}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: '30px',
                                                            height: '30px',
                                                            borderRadius: '50%',
                                                            border: '1px solid #c9c9c9',
                                                            backgroundColor: color.hex,
                                                            zIndex: 2
                                                        }}
                                                        
                                                    />

                                                    <Typography
                                                        component='p'
                                                        fontSize='14px'
                                                        textAlign='center'
                                                        sx={{ zIndex: 2 }}
                                                    >
                                                        {capitalize(color.name)}
                                                    </Typography>
                                                </Box>
                                            </Button>
                                        ))
                                    }
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Tag */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    component='h4'
                                    fontSize='18px'
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    Etiqueta
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <Autocomplete
                                        value={filters.tag || null}
                                        defaultValue={null}
                                        options={tags || []}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Buscar" variant='outlined' size='small' />
                                        )}
                                        fullWidth
                                        onChange={(event, value) => {
                                            if (value) {
                                                setFilters({ ...filters, tag: value });
                                            } else {
                                                setFilters({ ...filters, tag: '' });
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Button
                                color='primary'
                                className='black-btn'
                                onClick={resetFilters}
                            >
                                Limpiar filtros
                            </Button>
                        </motion.div>
                    )
                }

                {/* Products */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '40px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}
                >
                    {
                        filteredProducts.map(product => (
                            <ProductCard product={product} key={product.slug} />
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
};
