import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Midflora Herbal | Private Label Cosmetic Company",
  description: "Learn about Midflora Herbal, a trusted herbal cosmetic manufacturer offering Ayurvedic, skincare, haircare, private label, and contract manufacturing solutions.",
  keywords: "About Midflora Herbal, Herbal Cosmetic Manufacturer, Ayurvedic Cosmetic Manufacturer, Cosmetic Company India, Private Label Cosmetics, Contract Manufacturing Cosmetics, Herbal Skincare Manufacturer, Herbal Haircare Manufacturer, Natural Beauty Products, Third Party Cosmetic Manufacturing, Cosmetic Exporter India, Herbal Products Manufacturer",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
