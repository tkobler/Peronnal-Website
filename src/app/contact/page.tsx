import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Your Name — Master's student in Engineering at EPFL.",
};

export default function ContactPage() {
  return <ContactClient />;
}
