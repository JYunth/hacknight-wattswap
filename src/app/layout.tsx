import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { ThemeProvider } from '@/components/theme-provider';


export const metadata: Metadata = {
  title: 'WattSwap - Energy Trading Platform',
  description: 'Trade energy efficiently with WattSwap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='antialiased' 
      style={{ fontFamily: "LunchtypeRegular" }}>  
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pb-20">
              {children}
            </main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
