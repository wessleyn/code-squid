import { Metadata } from 'next'
import '@styles/globals.css'

export const metadata: Metadata = {
    title: 'Code Squid',
    description: "A lost squid on the journey "
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