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

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between min-h-screen">
        <Navbar />
        <div id='pageContent' className="w-11/12 lg:w-3/4 2xl:w-1/2 mx-auto mb-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html >
  );
}
