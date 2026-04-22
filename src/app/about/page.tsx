import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Clément Chalut — EPFL Microengineering student, Manufacturing Manager at Stérilux, private pilot, and trumpet performer.",
};

export default function AboutPage() {
  return <AboutClient />;
}
