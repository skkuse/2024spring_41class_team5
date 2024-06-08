import type { Metadata } from 'next'
import './globals.css'
import Header from './_components/Header'


export const metadata: Metadata = {
  title: 'Eco Merge',
  description: 'Make your codebase eco-friendly!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-[100dvh] w-full max-w-12c m-auto flex-col gap-12">
        <Header />
        {children}
      </body>
    </html>
  )
}
