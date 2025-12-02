import About from "@/components/about/About";
import FooterSection from "@/components/FooterSection";

export default function page() {
  return (
    <main className="px-4 md:px-8 lg:px-14">
      <About />
      <FooterSection />
    </main>
  );
}
