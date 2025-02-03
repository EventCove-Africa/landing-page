// components/Layout.tsx
import React, { FC, ReactNode } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./components/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <section className="w-full h-full">
      <div className="sticky top-0 w-full flex items-center h-[75px] z-50 bg-white">
        <Header />
      </div>
      <main className="w-full h-full">{children}</main>
      <div className="w-full h-full bg-white">
        <Footer />
      </div>
    </section>
  );
};

export default Layout;
