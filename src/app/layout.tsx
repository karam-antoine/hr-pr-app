'use client';

import { SessionProvider } from 'next-auth/react';

import AuthGuard from '@/components/AuthGuard';

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SessionProvider>
          <AuthGuard>
            <div className="main-container">{children}</div>
          </AuthGuard>
        </SessionProvider>
      </body>
    </html>
  );
}
