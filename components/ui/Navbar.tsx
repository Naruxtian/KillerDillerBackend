import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined, FavoriteBorderOutlined, MenuOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { CartContext, UIContext } from '../../context';
import { Logo } from './';
import { WishlistContext } from '../../context/wishlist';

export const Navbar = () => {
    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext(UIContext);
    const { numberOfItems: numberOfCartItems } = useContext(CartContext);
    const { numberOfItems: numberOfWishlistItems } = useContext(WishlistContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) {
            return;
        }

        push(`/search/${searchTerm}`);
    }

    // TextField autoFocus
    const textFieldInputFocus = (inputRef: any) => {
        if (inputRef && inputRef.node !== null) {
            setTimeout(() => {
                inputRef.focus();
            }, 100);
        }

        return inputRef;
    };

    let textFieldProps = { inputRef: textFieldInputFocus }

    return (
        <motion.div>
            <AppBar 
                sx={{
                    borderBottom: '2px solid black'
                }}
            >
                <Toolbar>
                    <Logo />

                    <Box flex={1} />

                    <Box className='fadeIn' sx={{display: isSearchVisible ? 'none' : {xs: 'none', sm: 'flex'}}}>
                        <NextLink href='/category/men' passHref>
                            <Link display='flex' alignItems='center'>
                                <Button 
                                    color={asPath === '/category/men' ? 'primary' : 'info'}
                                    className={asPath === '/category/men' ? 'black-btn' : ''}
                                >
                                    Hombres
                                </Button>
                            </Link> 
                        </NextLink>
                        <NextLink href='/category/women' passHref>
                            <Link display='flex' alignItems='center'>
                                <Button 
                                    color={asPath === '/category/women' ? 'primary' : 'info'}
                                    className={asPath === '/category/women' ? 'black-btn' : ''}
                                >
                                    Mujeres
                                </Button>
                            </Link> 
                        </NextLink>
                        <NextLink href='/category/kids' passHref>
                            <Link display='flex' alignItems='center'>
                                <Button 
                                    color={asPath === '/category/kids' ? 'primary' : 'info'}
                                    className={asPath === '/category/kids' ? 'black-btn' : ''}
                                >
                                    Niños
                                </Button>
                            </Link> 
                        </NextLink>
                    </Box>

                    <Box flex={1} />

                    {/* Bigger screens */}
                    {
                        isSearchVisible ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                className='fadeIn'
                                autoFocus
                                type='text'
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                onKeyPress={(event) => event.key === 'Enter' ? onSearchTerm() : null}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsSearchVisible(false)}
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        ) : (
                            <IconButton
                                className='fadeIn'
                                onClick={() => setIsSearchVisible(true)}
                            >
                                <SearchOutlined
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                />
                            </IconButton>
                        )
                    }

                    {/* Small screens */}
                    <IconButton
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                        onClick={toggleSideMenu}
                    >
                        <SearchOutlined />
                    </IconButton>

                    <NextLink href='/wishlist' passHref>
                        <Link>
                            <IconButton>
                                <Badge badgeContent={numberOfWishlistItems > 9 ? '+9' : numberOfWishlistItems} color='primary'>
                                    <FavoriteBorderOutlined />
                                </Badge>
                            </IconButton>
                        </Link>
                    </NextLink>

                    <NextLink href='/cart' passHref>
                        <Link>
                            <IconButton>
                                <Badge badgeContent={numberOfCartItems > 9 ? '+9' : numberOfCartItems} color='primary'>
                                
                                    <ShoppingCartOutlined />
                                </Badge>
                            </IconButton>
                        </Link>
                    </NextLink>

                    <IconButton onClick={toggleSideMenu}>
                        <MenuOutlined />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};