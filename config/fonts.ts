import { Bricolage_Grotesque, Inter } from "next/font/google";
export const BricolageFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-bricolage",
});

export const InterFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
