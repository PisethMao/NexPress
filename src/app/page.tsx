import AuthorSpotlight from "@/components/author/AuthorSpotlight";
import BlogFeed from "@/components/BlogFeed";
import CategoriesSection from "@/components/categories/CategoriesSection";
import FeaturedPosts from "@/components/featured/FeaturedPosts";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/hero/HeroSection";
import LatestPostsSection from "@/components/latest/LatestPostsSection";
import NewsletterSection from "@/components/newsletter/NewsletterSection";

export default function Home() {
  return (
    <div className="px-4 md:px-8 lg:px-14">
      <HeroSection />
      <FeaturedPosts />
      <CategoriesSection />
      <LatestPostsSection />
      <AuthorSpotlight />
      <NewsletterSection />
      <BlogFeed />
      <FooterSection />
    </div>
  );
}
