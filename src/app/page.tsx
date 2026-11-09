import CtaBookingBand from "@/components/CtaBookingsBand";
import InfoSection from "@/components/InfoSection";
import InquiryOfferingsSection from "@/components/InquiryOfferingsSection";
import { HeroSection } from "@/components/ruixen/hero-section-glass-web";
import ServicesHighlight from "@/components/ServiceHighlight";
import StudioCrossPromo from "@/components/StudioCrossPromo";
import { studio5 } from "@/lib/imageData";

export default async function Home() {
  return (
    <div>
      <HeroSection
        title="CMMG Bookings"
        imageSrc={studio5}
        videoSrc="/ideation_clip_3.mp4"
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        description="Book professional music recording studios, green screen production spaces, and podcast sessions with clear packages, transparent pricing, and the support your project needs."
        services={["Recording Studios", "Green Screen Studio", "Final Mix"]}
        metaLeft="Music"
        metaCenter="Content"
        metaRight="Studios"
      />
      <StudioCrossPromo />
      <InfoSection />
      <ServicesHighlight />
      <CtaBookingBand />
      <InquiryOfferingsSection />
    </div>
  );
}

const primaryAction = {
  href: "#services",
  label: "Explore Studios",
};
const secondaryAction = {
  href: "#enquiries",
  label: "Explore Productions",
};
