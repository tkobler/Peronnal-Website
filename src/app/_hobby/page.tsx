import type { Metadata } from "next";
import HobbyClient from "./HobbyClient";

export const metadata: Metadata = {
  title: "Hobby",
  description: "A portfolio doesn't have to be all projects — this page is a placeholder for something you do outside of engineering.",
};

export default function HobbyPage() {
  return <HobbyClient />;
}
