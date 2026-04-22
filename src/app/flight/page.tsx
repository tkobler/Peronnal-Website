import type { Metadata } from "next";
import FlightClient from "./FlightClient";

export const metadata: Metadata = {
  title: "Flight Log",
  description: "Private pilot flight log — 90+ hours across the Alps, France, Italy, and Switzerland on single-engine aircraft.",
};

export default function FlightPage() {
  return <FlightClient />;
}
