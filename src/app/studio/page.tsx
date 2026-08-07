import React from "react";
import { HeroSection } from "@/components/ruixen/hero-section-glass-web";
import { getActivePackages } from "@/data/services/service-packages";
import BookingSection from "@/components/BookingSection";
import { studio5 } from "@/lib/imageData";
import ServicesGrid from "@/components/ServiceGrid";
import BentoGrid from "@/components/BentoGrid";
import StudioCrossPromo from "@/components/StudioCrossPromo";

export default async function StudioPage() {
  const packages = await getActivePackages();
  return (
    <div>
      <HeroSection
        kicker="CMMG Studio"
        title="Record Master"
        imageSrc={studio5}
        description="Acoustically treated rooms, industry-standard consoles, and an in-house mix and master chain — everything a track needs from first take to final release."
        services={["Recording", "Mixing", "Mastering"]}
        primaryAction={{ href: "#book", label: "Book a Session" }}
        secondaryAction={{ href: "#services", label: "View Packages" }}
        metaLeft="Midrand, JHB"
        metaCenter="4 Rooms"
        metaRight="Est. 2019"
      />
      <ServicesGrid />
      <StudioCrossPromo />
      <BentoGrid />
      <BookingSection packages={packages} />
    </div>
  );
}
