import { BricolageFont, InterFont } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/shared/components/theme-setting/theme-provider";
import { ThemeSelect } from "@/shared/components/theme-setting/theme-select";
import { Toaster } from "@/shared/components/ui/sonner";
import { ReactQueryProviders } from "@/shared/providers/react-query-providers";
import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          InterFont.variable,
          BricolageFont.variable
        )}
      >
        <ReactQueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex flex-col min-h-screen">
              <main>
                <ThemeSelect />
                {children}
              </main>
              <Toaster position="top-right" />
            </div>
          </ThemeProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
