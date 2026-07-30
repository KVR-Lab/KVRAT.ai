"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      <Sidebar />

      <div style={{flex:1}}>
        <Header />

        <div style={{padding:25}}>
          {children}
        </div>
      </div>
    </div>
  );
}