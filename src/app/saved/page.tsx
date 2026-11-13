import type { Metadata } from "next";
import { SavedCalculations } from "@/components/calculators/saved-calculations";

export const metadata: Metadata = {
  title: "Saved calculations",
  description: "Review calculations you chose to save in this browser.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/saved" },
};

export default function SavedPage() {
  return <SavedCalculations />;
}
