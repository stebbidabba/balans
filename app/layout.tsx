import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '../contexts/CartContext'
import CartSidebar from '../components/CartSidebar'

export const metadata: Metadata = {
  title: 'Balans - Hormone Health Testing',
  description: 'Order an at-home kit, send your sample, and get clear results — all under your own private dashboard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
