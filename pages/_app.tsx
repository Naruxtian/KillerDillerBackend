import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UIProvider } from '../context';
import { WishlistProvider } from '../context/wishlist';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <SnackbarProvider maxSnack={3}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <UIProvider>
                  <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UIProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </SnackbarProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
