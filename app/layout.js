"use client";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";
import Announce from "./components/Announce";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
        <StoreProvider>
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
      </body>
    </html>
  );
}
