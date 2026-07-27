import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Rise Creative®️ | Creative House - Design, Branding & Streetwear",
  description: "Rise Creative®️ é uma Creative House especializada em Branding, Design Premium, Moda Streetwear e Produção Visual. Create Beyond Limits.",
  keywords: "Rise Creative, Creative House, Design, Branding, Streetwear, Rayssa Castro, Manaus, Agência de Design, Moda, FilmMaker",
  openGraph: {
    title: "Rise Creative®️ | Creative House",
    description: "Criamos identidades que inspiram. Design, Branding e Streetwear com estética internacional e premium.",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-neon-purple selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
