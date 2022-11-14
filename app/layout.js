"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import Announce from "./components/Announce";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout({ children, ...props }) {
  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          <StoreProvider>
            <ToastContainer position="buttom-center" limit={1} />
            <div className="flex flex-col justify-between h-screen">
              <header>
                <Announce />
                <Navbar />
              </header>
              <main className="flex-1">{children}</main>
              <footer>
                <Footer />
              </footer>
            </div>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
