import Header from '@/components/Layout/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import 'react-toastify/dist/ReactToastify.css';
import ApplicationView from '@/components/AplicationView'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SuperMotos',
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
            <ApplicationView>
              {children}
            </ApplicationView>
          </StyledComponentsRegistry>
      </body>
    </html>
  )
}
