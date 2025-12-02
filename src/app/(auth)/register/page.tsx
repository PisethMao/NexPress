import SignUp from "@/components/signup/SignUp";
import FooterSection from "@/components/FooterSection";

export default function page() {
  return (
    <div className="px-4 md:px-8 lg:px-14">
      <SignUp/>
      <FooterSection />
    </div>
  )
}
