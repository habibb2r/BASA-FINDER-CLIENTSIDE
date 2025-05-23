
import HeroSection from "@/components/modules/home/HeroSection";
import RentalListings from "@/components/modules/home/RentalListings";
import Testimonials from "@/components/modules/home/Testimonials";

const HomePage = async () => {
  return (
    <div>
      <HeroSection />
      <RentalListings />
      <Testimonials />
    </div>
  );
};

export default HomePage;
