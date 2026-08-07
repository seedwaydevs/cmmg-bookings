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
        title="CMMG Studios"
        imageSrc={studio5}
        videoSrc="/ideation_clip_3.mp4"
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        description="State-of-the-art recording studios and green screen facilities equipped with professional-grade equipment, pristine acoustic treatment, and cutting-edge film production technology. "
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
  href: "#book",
  label: "Book A Session",
};
const secondaryAction = {
  href: "#services",
  label: "Browse Services",
};
