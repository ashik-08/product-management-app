import MainLayout from "../components/layout/MainLayout";
import { Providers } from "../components/providers";
import "./globals.css";

export const metadata = {
  title: "Product Management App",
  description: "A modern product management application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-anti-flash-white">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
