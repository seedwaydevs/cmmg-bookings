import BentoGrid from "@/components/BentoGrid";
import BookingSection from "@/components/BookingSection";

import { HeroSection } from "@/components/ruixen/hero-section-glass-web";
import ServicesGrid from "@/components/ServiceGrid";
import StatsSection from "@/components/StatsSection";
import { getActivePackages } from "@/data/services/service-packages";
import { studio1, studio5, studio7 } from "@/lib/imageData";

export default async function Home() {
  const packages = await getActivePackages();
  return (
    <div>
      <HeroSection
        title="Content And Media Bookings"
        imageSrc={studio5}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        description="State-of-the-art recording studios and green screen facilities equipped with professional-grade equipment, pristine acoustic treatment, and cutting-edge film production technology. "
        services={["Recording Studios", "Green Screen Studio", "Final Mix"]}
        metaLeft="Music"
        metaCenter="Content"
        metaRight="Studios"
      />
      <ServicesGrid />
      <BentoGrid />
      <StatsSection />
      <BookingSection packages={packages} />
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
