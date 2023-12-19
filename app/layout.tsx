import type { Metadata } from 'next'
import './globals.css'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { inter, ibmPlexMono } from '@/app/fonts';
import Navbar from '@/app/components/navigation/Navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | Parse Hog',
    default: 'Parse Hog',
  },
  description: 'Data tools for healthcare professionals, by healthcare professionals. Parse HL7 messages, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${inter.className}`}>
        <Navbar />
        <div id='pageContent' className='w-3/4 mx-auto'>
          {children}
        </div>
      </body>
    </html>
  )
}
