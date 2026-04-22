import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Clément Chalut — currently at Stérilux, seeking a Master's thesis or internship in photonics, embedded systems, or product engineering.",
};

export default function ContactPage() {
  return <ContactClient />;
}
