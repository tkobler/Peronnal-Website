import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience — from medical device manufacturing to drone research, teaching, and community service.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
