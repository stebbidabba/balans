import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
