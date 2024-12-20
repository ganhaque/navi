import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "@/globals.css";
import "@/styles.css";
import "@/responsive.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/app_sidebar/mod";
/* import { ThemeProvider } from "@/components/ui/theme-provider"; */
/* import db from "@/server/db"; */

import SiteHeader from "./site-header";
import { FilterProvider } from "@/app/data_provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <ThemeProvider */}
      {/*   attribute="class" */}
      {/*   defaultTheme="system" */}
      {/*   enableSystem */}
      {/*   disableTransitionOnChange */}
      {/* > */}
      <body
        style={{
          overflow: "visible",
          margin: "0",
          minHeight: "100vh",
          backgroundColor: "hsla(var(--black))",
          color: "hsla(var(--white))",
        }}
        className={inter.className}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}>
          <FilterProvider>
            <SidebarProvider>
              <AppSidebar />
              <main style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                flexShrink: "1",
                flexBasis: "0%",
              }}>
                <SiteHeader />
                <div style={{
                  display: "flex",
                  flexGrow: "1",
                }}>
                  {children}
                </div>
              </main>
            </SidebarProvider>
          </FilterProvider>
        </div>
      </body>
      {/* </ThemeProvider> */}
    </html>
  );
}
