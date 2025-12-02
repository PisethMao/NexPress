import BlogCard from "@/components/cards/BlogCard";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/navbar/Navbar";

export default function page() {
  return (
    <main>
      <Navbar />
      <BlogCard />
      <FooterSection />
    </main>
  );
}
