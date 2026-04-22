import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Log",
  description: "Personal flight log and aviation dashboard — airports visited, flight statistics, and travel map.",
};

export default function FlightLayout({ children }: { children: React.ReactNode }) {
  return children;
}
