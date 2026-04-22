import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Clément Chalut — engineering student, maker, and musician.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
