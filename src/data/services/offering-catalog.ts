import { BookingService } from "@/lib/schemas";

export type BookableOfferingSeed = {
  slug: string;
  service: BookingService;
  category: string;
  name: string;
  durationLabel: string;
  minutes: number;
  priceCents: number;
  description: string;
  includes: string[];
  requiresPaidFullDayStudioBooking?: boolean;
  displayOrder: number;
};

export type InquiryOffering = {
  studio: string;
  category: string;
  name: string;
  details: string;
  priceLabel: string;
  description: string;
};

export const BOOKING_SERVICES: Array<{
  value: BookingService;
  label: string;
  num: string;
  description: string;
}> = [
  {
    value: "STUDIO",
    label: "Music Studio",
    num: "01",
    description: "Recording sessions for artists, producers, and brands.",
  },
  {
    value: "GREENSCREEN",
    label: "Green Screen Studio",
    num: "02",
    description: "Production shoots, podcast sessions, and studio bundle access.",
  },
];

export const BOOKABLE_OFFERINGS: BookableOfferingSeed[] = [
  {
    slug: "music-studio-half-day",
    service: "STUDIO",
    category: "Studio Pricing",
    name: "Studio Only",
    durationLabel: "Half Day (5 hrs)",
    minutes: 300,
    priceCents: 250000,
    description:
      "Private access to the music recording studio for artists or producers working with their own engineer.",
    includes: [
      "5 hours of studio time",
      "Acoustically treated recording room",
      "Professional microphones and studio monitoring",
      "Bring your own technician or engineer",
    ],
    displayOrder: 10,
  },
  {
    slug: "music-studio-full-day",
    service: "STUDIO",
    category: "Studio Pricing",
    name: "Studio Only",
    durationLabel: "Full Day (9 hrs)",
    minutes: 540,
    priceCents: 520000,
    description:
      "Extended studio access for full recording days, album sessions, or projects that need uninterrupted time.",
    includes: [
      "9 hours of studio time",
      "Acoustically treated recording room",
      "Professional microphones and studio monitoring",
      "Bring your own technician or engineer",
    ],
    displayOrder: 20,
  },
  {
    slug: "music-studio-tech-half-day",
    service: "STUDIO",
    category: "Studio Pricing",
    name: "Studio + Technician",
    durationLabel: "Half Day (5 hrs)",
    minutes: 300,
    priceCents: 380000,
    description:
      "A guided recording session with an in-house technician handling the room, signal chain, and session support.",
    includes: [
      "5 hours of studio time",
      "In-house technician / engineer support",
      "Professional microphones and studio monitoring",
      "Session setup and technical assistance",
    ],
    displayOrder: 30,
  },
  {
    slug: "music-studio-tech-full-day",
    service: "STUDIO",
    category: "Studio Pricing",
    name: "Studio + Technician",
    durationLabel: "Full Day (9 hrs)",
    minutes: 540,
    priceCents: 750000,
    description:
      "A full production day in the music studio with technical support throughout the session.",
    includes: [
      "9 hours of studio time",
      "In-house technician / engineer support",
      "Professional microphones and studio monitoring",
      "Session setup and technical assistance",
    ],
    displayOrder: 40,
  },
  {
    slug: "green-screen-half-day",
    service: "GREENSCREEN",
    category: "Production Shoots",
    name: "Studio Only",
    durationLabel: "Half Day (5 hrs)",
    minutes: 300,
    priceCents: 350000,
    description:
      "Use the green screen studio as a dry hire space for shoots that already have their own crew and gear.",
    includes: [
      "5 hours of green screen studio access",
      "Studio only hire",
      "No cameras, sound, or technician included",
      "Ideal for crews bringing their own equipment",
    ],
    displayOrder: 50,
  },
  {
    slug: "green-screen-full-day",
    service: "GREENSCREEN",
    category: "Production Shoots",
    name: "Studio Only",
    durationLabel: "Full Day (9 hrs)",
    minutes: 540,
    priceCents: 750000,
    description:
      "A full-day green screen studio booking for production teams using their own technical setup.",
    includes: [
      "9 hours of green screen studio access",
      "Studio only hire",
      "No cameras, sound, or technician included",
      "Ideal for crews bringing their own equipment",
    ],
    displayOrder: 60,
  },
  {
    slug: "green-screen-production-half-day",
    service: "GREENSCREEN",
    category: "Production Shoots",
    name: "Full Production Package",
    durationLabel: "Half Day (5 hrs)",
    minutes: 300,
    priceCents: 495000,
    description:
      "A supported green screen production session with camera, sound, and technical help included.",
    includes: [
      "5 hours of green screen studio access",
      "Camera setup included",
      "Sound capture included",
      "On-site technician support",
    ],
    displayOrder: 70,
  },
  {
    slug: "green-screen-production-full-day",
    service: "GREENSCREEN",
    category: "Production Shoots",
    name: "Full Production Package",
    durationLabel: "Full Day (9 hrs)",
    minutes: 540,
    priceCents: 960000,
    description:
      "A full production day with studio, camera, sound, and technical support included.",
    includes: [
      "9 hours of green screen studio access",
      "Camera setup included",
      "Sound capture included",
      "On-site technician support",
    ],
    displayOrder: 80,
  },
  {
    slug: "podcast-studio-only-2h",
    service: "GREENSCREEN",
    category: "Podcast Sessions",
    name: "Studio Only",
    durationLabel: "2 Hours",
    minutes: 120,
    priceCents: 150000,
    description:
      "A short podcast studio booking for teams bringing their own cameras, sound, and production crew.",
    includes: [
      "2 hours of studio access",
      "Podcast set / studio space",
      "No cameras or sound included",
      "No technician included",
    ],
    displayOrder: 90,
  },
  {
    slug: "podcast-studio-only-3h",
    service: "GREENSCREEN",
    category: "Podcast Sessions",
    name: "Studio Only",
    durationLabel: "3 Hours",
    minutes: 180,
    priceCents: 220000,
    description:
      "An extended podcast studio booking for teams running their own technical setup.",
    includes: [
      "3 hours of studio access",
      "Podcast set / studio space",
      "No cameras or sound included",
      "No technician included",
    ],
    displayOrder: 100,
  },
  {
    slug: "podcast-production-2h-1cam",
    service: "GREENSCREEN",
    category: "Podcast Sessions",
    name: "Podcast Production",
    durationLabel: "2 Hours | 1 Camera",
    minutes: 120,
    priceCents: 270000,
    description:
      "A compact podcast production slot with in-house technical support and a single-camera setup.",
    includes: [
      "2 hours of studio access",
      "1 Canon R5 camera",
      "Rode mic setup",
      "Technician support",
    ],
    displayOrder: 110,
  },
  {
    slug: "podcast-production-2h-multicam",
    service: "GREENSCREEN",
    category: "Podcast Sessions",
    name: "Podcast Production",
    durationLabel: "2 Hours | Multi-Cam",
    minutes: 120,
    priceCents: 375000,
    description:
      "A two-hour podcast production booking with a multi-camera setup, audio capture, and technician support.",
    includes: [
      "2 hours of studio access",
      "2 Canon R5 cameras",
      "Rode mic setup",
      "Technician support",
    ],
    displayOrder: 120,
  },
  {
    slug: "podcast-production-3h-1cam",
    service: "GREENSCREEN",
    category: "Podcast Sessions",
    name: "Podcast Production",
    durationLabel: "3 Hours | 1 Camera",
    minutes: 180,
    priceCents: 330000,
    description:
      "A longer single-camera podcast session with audio and technician support included.",
    includes: [
      "3 hours of studio access",
      "1 Canon R5 camera",
      "Rode mic setup",
      "Technician support",
    ],
    displayOrder: 130,
  },
  {
    slug: "podcast-production-3h-multicam",
    service: "GREENSCREEN",
    category: "Podcast Sessions",
    name: "Podcast Production",
    durationLabel: "3 Hours | Multi-Cam",
    minutes: 180,
    priceCents: 405000,
    description:
      "An extended multi-camera podcast recording with the technical setup handled for you.",
    includes: [
      "3 hours of studio access",
      "2 Canon R5 cameras",
      "Rode mic setup",
      "Technician support",
    ],
    displayOrder: 140,
  },
  {
    slug: "studio-bundle-full-day",
    service: "GREENSCREEN",
    category: "Bundle Offer",
    name: "Recording Studio Bundle",
    durationLabel: "Full Day",
    minutes: 540,
    priceCents: 820000,
    description:
      "Discounted green screen access for clients who have already booked and paid for a full-day music studio session.",
    includes: [
      "Discounted green screen access",
      "Bundle pricing linked to a paid full-day music studio booking",
      "Available only once the studio booking has been confirmed and paid",
    ],
    requiresPaidFullDayStudioBooking: true,
    displayOrder: 150,
  },
];

export const INQUIRY_ONLY_OFFERINGS: InquiryOffering[] = [
  {
    studio: "Music Recording Studio",
    category: "Recording Packages",
    name: "Single Recording",
    details: "Per session (incl. mixing & mastering)",
    priceLabel: "R4,500",
    description:
      "For artists who need a guided recording session with post-production included.",
  },
  {
    studio: "Music Recording Studio",
    category: "Recording Packages",
    name: "EP Recording (2-3 tracks)",
    details: "Package rate (incl. mixing & mastering)",
    priceLabel: "R8,500",
    description:
      "A bundled package for smaller projects that need more planning and session coordination.",
  },
  {
    studio: "Music Recording Studio",
    category: "Recording Packages",
    name: "Album Recording (Full Project)",
    details: "Package (incl. mixing & mastering)",
    priceLabel: "R27,500",
    description:
      "Best handled as a tailored production enquiry because scope, schedule, and deliverables vary by project.",
  },
  {
    studio: "Music Recording Studio",
    category: "Additional Services",
    name: "Radio Jingle Production",
    details: "Voice over, music, and sound design",
    priceLabel: "R8,500",
    description:
      "A custom production service for commercial and campaign work that needs creative alignment before booking.",
  },
  {
    studio: "Music Recording Studio",
    category: "Additional Services",
    name: "Voice Over Recording",
    details: "With technician / engineer",
    priceLabel: "R2,800",
    description:
      "A quote-first service for voice projects, ad reads, and branded content sessions.",
  },
  {
    studio: "Music Recording Studio",
    category: "Additional Services",
    name: "Final Mix",
    details: "Per episode",
    priceLabel: "R3,500",
    description:
      "Available by enquiry so the team can confirm stems, turnaround, and delivery requirements.",
  },
  {
    studio: "Music Recording Studio",
    category: "Additional Services",
    name: "Mastering",
    details: "Per track",
    priceLabel: "R850",
    description:
      "Handled via enquiry to confirm track count, revisions, and final format requirements.",
  },
  {
    studio: "Green Screen Studio",
    category: "Podcast Sessions",
    name: "Editing",
    details: "Post-production",
    priceLabel: "R1,800",
    description:
      "Podcast editing is priced separately and handled as a follow-up enquiry after the recording session.",
  },
];
