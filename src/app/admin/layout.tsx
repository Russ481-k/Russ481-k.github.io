"use client";

import React from "react";
import Sidebar from "./Components/Sidebar";
import "../Styles/globals.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">{children}</main>
      <style jsx>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f8f9fa;
        }
        .admin-main {
          flex: 1;
          margin-left: 250px; /* Width of sidebar */
          padding: 2rem;
          background: #f8f9fa;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
