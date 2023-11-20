"use client";
import { ThemeRegistry } from "@/config/theme";
import NextAuthProvider from "@/providers/NextAuthProvider";
import type { Metadata } from "next";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>EST Edu</title>
      </head>
      <body>
        <ThemeRegistry>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <NextAuthProvider>{children}</NextAuthProvider>
            <ToastContainer position="top-center" pauseOnHover={false} />
          </LocalizationProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
