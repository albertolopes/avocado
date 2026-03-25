import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Avocado Tech — Engenharia de Software e Consultoria Técnica',
  description:
    'Especialistas em desenvolvimento de sistemas robustos, microserviços e arquitetura de software escalável. Transformamos sua visão técnica em realidade de alta performance.',
  keywords: ['software engineer', 'backend developer', 'microserviços', 'consultoria técnica', 'arquitetura de software', 'java spring boot', 'node.js', 'next.js', 'tecnologia', 'df', 'sobradinho'],
  authors: [{ name: 'Alberto Silva Lopes' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Avocado Tech — Engenharia de Software e Consultoria Técnica',
    description: 'Transformamos ideias em software escalável com arquitetura de ponta.',
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avocado Tech — Engenharia de Software e Consultoria Técnica',
    description: 'Software Engineering at its Peak.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
