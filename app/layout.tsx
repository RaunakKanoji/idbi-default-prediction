import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MSME Risk360 | IDBI Bank",
  description: "Predictive default risk and early-warning platform for MSME credit operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
