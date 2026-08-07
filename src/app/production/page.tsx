import ClientWorkCarousel from "@/components/ClientWorkCarousel";
import CtaEnquiryBand from "@/components/CtaEnquiryBand";
import InquiryOfferingsSection from "@/components/InquiryOfferingsSection";
import ProductionServicesGrid from "@/components/ProductionServicesGrid";
import { HeroSection } from "@/components/ruixen/hero-section-glass-web";
import StudioCrossPromo from "@/components/StudioCrossPromo";
import React from "react";

export default async function ProductionPage() {
  return (
    <div>
      <HeroSection
        kicker="CMMG Production"
        title="Frame Story"
        videoSrc="/ideation_clip_3.mp4"
        description="Film, photography, and content production shot and finished in-house — from concept through final cut, one crew carries it the whole way."
        primaryAction={{ href: "#enquiries", label: "Start an Enquiry" }}
        secondaryAction={{ href: "#services", label: "View Services" }}
        metaLeft="Midrand, JHB"
        metaCenter="1 Sound Stage"
        metaRight="Est. 2019"
      />
      <ProductionServicesGrid />
      <StudioCrossPromo />
      <ClientWorkCarousel />
      <CtaEnquiryBand />
      <InquiryOfferingsSection />
    </div>
  );
}
