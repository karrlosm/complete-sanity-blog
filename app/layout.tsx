import type { Metadata } from "next";
import { Roboto_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import ProgressProviderWrapper from "./components/ProgressBar";
import Footer from "./components/Footer";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'MegaBlog',
  description: 'O MegaBlog é um projeto de demonstração criado para apresentar minhas habilidades com desenvolvimento web moderno, utilizando Next.js, TailwindCSS e integração com CMS headless.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ProgressProviderWrapper>
            <Navbar />
            <main className="mt-20 ">
              {children}
            </main>
            <Footer />
          </ProgressProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
