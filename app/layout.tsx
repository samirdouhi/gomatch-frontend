import "./globals.css";
import { ThemeProvider } from "./providers";
import ClientShell from "./components/ClientShell";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className="h-full">
      <body className="h-screen overflow-hidden">
        <ThemeProvider>
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}












