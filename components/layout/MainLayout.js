"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  const pathname = usePathname();

  // Pages where we don't want navbar and footer
  const authPages = ["/login", "/register"];
  const hideNavFooter = authPages.includes(pathname);

  if (hideNavFooter) {
    return children;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
