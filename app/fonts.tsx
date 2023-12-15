import { Inter, IBM_Plex_Mono } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const ibmPlexMono = IBM_Plex_Mono({
    weight: ["300", "400", "500"],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ibm-plex-mono',
})