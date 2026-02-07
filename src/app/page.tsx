import CardCarouselHero from "@/components/ruixen/card-carousel-hero";
import { HeroSection } from "@/components/ruixen/hero-section-glass-web";
import { studio1, studio5, studio7 } from "@/lib/imageData";

export default function Home() {
  return (
    <div>
      <HeroSection
        title="Content And Media Bookings"
        imageSrc={[studio5.src, studio1.src, studio7.src]}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        description="State-of-the-art recording studios and green screen facilities equipped with professional-grade equipment, pristine acoustic treatment, and cutting-edge film production technology. "
        services={["Recording Studios", "Green Screen Studio", "Final Mix"]}
        metaLeft="Music"
        metaCenter="Content"
        metaRight="Studios"
      />
    </div>
  );
}

const primaryAction = {
  href: "#book",
  label: "Book A Session",
};
const secondaryAction = {
  href: "#services",
  label: "Browse Services",
};
