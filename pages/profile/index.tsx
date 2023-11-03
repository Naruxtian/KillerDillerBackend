/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Box, Divider, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { dbProducts, dbUsers } from '../../database';
import { IUser } from '../../interfaces';
import { AccountForm, AddressForm, TagsForm } from '../../components/profile';

type ITag = {
    tags: string[];
}

type Props = {
    user: IUser,
    tags: ITag[];
};

const ProfilePage = ({ user, tags }: Props) => {
    // Remove duplicate tags and create an array of them
    const filteredTags = Array.from(new Set(tags.map(tag => tag.tags).flat()));

    return (
        <ShopLayout title='Killer Diller | Perfil' pageDescription='Tu perfil de Killer Diller'>
            <Box
                sx={{
                    maxWidth: '800px',
                    mx: 'auto'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant='h1' component='h1'>Perfil</Typography>

                    {/* User's information */}
                    <Box
                        sx={{
                            width: '100%',
                            mb: 5
                        }}
                    >
                        <Typography variant='h2' component='h2' sx={{ mt: 3 }}>Información de la cuenta</Typography>
                        <AccountForm user={user} />
                    </Box>

                    <Divider sx={{ width: '100%', mb: 2 }} />

                    {/* User's address
                    <Box
                        sx={{
                            width: '100%',
                            mb: 5
                        }}
                    >
                        <Typography variant='h2' component='h2'>Dirección de envío</Typography>
                        <AddressForm user={user} />
                    </Box>

                    <Divider sx={{ width: '100%', mb: 2 }} /> */}
                    
                    {/* Tags */}
                    <Box
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Typography variant='h2' component='h2'>Preferencias</Typography>
                        <TagsForm tags={filteredTags} user={user} />
                    </Box>
                </Box>
            </Box>
        </ShopLayout>
    );
};


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req });
    
    // Check there's a logged user
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=profile`,
                permanent: false
            }
        }
    }

    const userId = session.user._id;
    const user = await dbUsers.getUserById(userId);

    // If order does not exist, redirect
    if (!user) {
        return {
            redirect: {
                destination: '/auth/login?p=profile',
                permanent: false
            }
        }
    }

    // Check that user is the one that is logged in
    if (user._id !== session.user._id) {
        return {
            redirect: {
                destination: '/auth/login?p=profile',
                permanent: false
            }
        }
    }

    // Get all tags from existing products
    const tags = await dbProducts.getAllProductTags();

    return {
        props: {
            user,
            tags
        }
    }
}

export default ProfilePage;