import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Your Name — Master's student in Engineering at EPFL.",
};

export default function AboutPage() {
  return <AboutClient />;
}
