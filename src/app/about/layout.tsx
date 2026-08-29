import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Your Name — engineering student and maker.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
