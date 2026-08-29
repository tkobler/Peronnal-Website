import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tim Kobler — email, LinkedIn, and CV download.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
