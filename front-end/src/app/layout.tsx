import Header from '@/components/Layout/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import { Box, Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cris Elegance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body suppressHydrationWarning={true} className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          <ToastContainer theme="colored" />
          <Container sx={{ minWidth: '90vw' }}>
            <Box pt={3} pb={3}>
              {children}
            </Box>
          </Container>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
