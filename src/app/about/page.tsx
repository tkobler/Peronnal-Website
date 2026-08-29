import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description: "Tim Kobler — Robotics Master's student at EPFL.",
};

export default function AboutPage() {
  return <AboutClient />;
}
