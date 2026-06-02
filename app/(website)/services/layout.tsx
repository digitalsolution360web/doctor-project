import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Herbal & Cosmetic Manufacturing - Midflora Herbal",
  description: "Explore Midflora Herbal's services including herbal cosmetic manufacturing, private labeling, contract manufacturing, custom formulations, and bulk production.",
  keywords: "Herbal Cosmetic Manufacturing Services, Ayurvedic Cosmetic Manufacturer, Private Label Cosmetics, Contract Manufacturing Cosmetics, Third Party Cosmetic Manufacturing, OEM Cosmetic Manufacturer, Herbal Skincare Products, Herbal Haircare Products, Cosmetic Product Development, Custom Cosmetic Formulation, Natural Beauty Products, Bulk Cosmetic Manufacturing, Cosmetic Manufacturer India, Herbal Products Manufacturer",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
