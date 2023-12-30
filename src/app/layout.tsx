import LocalizationProviderWrapper from "@/components/custom/LocalizationProviderWrapper";
import { ThemeRegistry } from "@/config/theme";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "EST Edu",
  description: "EST Education",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthProvider>
            <LocalizationProviderWrapper>{children}</LocalizationProviderWrapper>
          </NextAuthProvider>
          <ToastContainer position="top-center" pauseOnHover={false} />
        </ThemeRegistry>
      </body>
    </html>
  );
}
