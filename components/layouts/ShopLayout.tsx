import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
import { Navbar, SideMenu } from '../ui';
import Footer from '../ui/Footer';

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout: React.FC<PropsWithChildren<Props>> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescription} />
                <meta name="og:description" content={pageDescription} />
                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
                    )
                }
            </Head>

            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto 20px auto',
                padding: '0px 30px',
                width: '100%',
                flex: 1
            }}>
                {children}
            </main>

            <Footer />
        </>
    );
}