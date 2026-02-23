import { APP_DESCRIPTION, APP_NAME } from "@/shared/lib/constants";
import { AntdThemeProvider } from "@/shared/theme/antd-theme-provider";
import { ThemeProvider } from "@/shared/theme/theme-provider";
import { AppShell } from "@/shared/ui/app-shell";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "antd/dist/reset.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen`}>
        <ThemeProvider>
          <AntdThemeProvider>
            <AppShell>{children}</AppShell>
          </AntdThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
