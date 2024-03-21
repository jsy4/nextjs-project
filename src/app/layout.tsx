'use client';

import dynamic from 'next/dynamic';
import './globals.css';
const DashboardLayout = dynamic(() => import('./components/layout'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
