import { Header, Sidebar } from "@/components/organisms";
import React from "react";

const Layout: React.FC<TLayoutProps> = ({ children }) => {
  return (
    <main
      className="flex"
    >
      <Sidebar />
      <div
        className="flex flex-col min-h-screen w-full"
      >
        <Header />
        {children}
      </div>
    </main>
  );
};

export default Layout;