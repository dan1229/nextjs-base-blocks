import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NextJS Base Blocks',
  description: 'A component library for Next.js',
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