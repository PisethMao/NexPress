import Login from "@/components/login/Login";
import FooterSection from "@/components/FooterSection";

export default function page() {
  return (
    <div className="px-4 md:px-8 lg:px-14">
      <Login/> 
      <FooterSection />
    </div>
  )
}
