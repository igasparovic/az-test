import React from 'react';
import RootLayout from '@/layout';
import '../assets/styles/globals.scss';
import { NotificationProvider } from '@/context/NotificationContext';
import {AppProps} from "next/app";
import Notification from "@/components/Notification/Notification";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <RootLayout>
        <Notification />
        <Component {...pageProps} />
      </RootLayout>
    </NotificationProvider>
  );
}
