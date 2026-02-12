"use client";

import Link from "next/link";
import React from "react";
import {
  FaInstagram,
  FaSquareFacebook,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

const Links = [
  {
    id: 1,
    app: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/cmmg_records/",
    class: "h-10 w-10 p-2 rounded-md hover:bg-orange-600",
  },
  {
    id: 2,
    app: "Facebook",
    icon: <FaSquareFacebook />,
    link: "https://www.facebook.com/profile.php?id=61582923471298",
    class: "h-10 w-10 p-2 rounded-md hover:bg-orange-600",
  },
  {
    id: 3,
    app: "TikTok",
    icon: <FaTiktok />,
    link: "https://www.tiktok.com/@cmmg_records",
    class: "h-10 w-10 p-2 rounded-md hover:bg-orange-600",
  },
  {
    id: 4,
    app: "YouTube",
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@CMMGRecord",
    class: "h-10 w-10 p-2 rounded-md hover:bg-orange-600",
  },
];

export default function SocialMediaLinks() {
  return (
    <div className="flex space-x-3">
      {Links.map((link) => (
        <Link key={link.id} href={link.link}>
          {React.cloneElement(link.icon, { className: link.class })}
        </Link>
      ))}
    </div>
  );
}
