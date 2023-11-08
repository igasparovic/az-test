import React from 'react';
import Header from "@/components/Header/Header";
import { Inter } from 'next/font/google';

const interFont = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: any) {
  return (
    <>
      <Header />
      <main className={interFont.className}>
        {children}
      </main>
    </>
  );
}
