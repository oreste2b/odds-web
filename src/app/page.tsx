import Hero from "@/components/Hero";
import FeaturedReel from "@/components/FeaturedReel";
import PillarsStrip from "@/components/PillarsStrip";
import Manifesto from "@/components/Manifesto";
import ServicesWheel from "@/components/ServicesWheel";
import IndustriesBand from "@/components/IndustriesBand";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home(): React.JSX.Element {
  return (
    <main className="relative w-full bg-surfaceTint">
      <Hero />
      <FeaturedReel />
      <PillarsStrip />
      <Manifesto />
      <ServicesWheel />
      <IndustriesBand />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
