import type { Metadata } from "next";
import "../style/globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Isadora Belmont",
  description: "Aplicativo de gestão financeira da Isadora Belmont",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head />
      <body>
        <div>
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
