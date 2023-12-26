import type { Metadata } from 'next'
import './globals.css'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { inter, ibmPlexMono } from '@/app/fonts';
import Navbar from '@/app/components/navigation/Navbar';
import Footer from '@/app/components/navigation/Footer';

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
      <body className={`flex flex-col justify-between ${inter.variable} ${ibmPlexMono.variable} ${inter.className} min-h-screen`}>
        <Navbar />
        <div id='pageContent' className='w-3/4 mx-auto mb-auto'>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
