import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tim Kobler — Robotics Master's student at EPFL.",
};

export default function ContactPage() {
  return <ContactClient />;
}
