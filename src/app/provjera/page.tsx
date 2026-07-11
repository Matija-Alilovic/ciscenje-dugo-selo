import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmployeeChecklistApp from "@/components/employee/EmployeeChecklistApp";

export const metadata: Metadata = {
  title: "Provjera rada — zaposlenici",
  description: "Interna checklista s fotkama prije/poslije — izvještaj na WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmployeeChecklistPage() {
  return (
    <>
      <Header />
      <main className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]">
        <EmployeeChecklistApp />
      </main>
      <Footer />
    </>
  );
}
