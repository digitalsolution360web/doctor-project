import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileContactBar from "@/components/MobileContactBar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
      <WhatsAppButton />
      <MobileContactBar />
    </>
  );
}