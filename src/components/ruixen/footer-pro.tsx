/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logo } from "@/lib/imageData";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface FooterProProps {
  description?: string;
  logo?: {
    dark: string;
    light: string;
  };
  contact?: {
    email: string;
    phone: string;
  };
  socials?: { icon: any; href: string }[];
  columns?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  copyright?: string;
}

const defaultProps: FooterProProps = {
  description:
    "The ultimate resource for professional sound designers, video producers, podcasters, musicians, content creators, and filmmakers who need world-class recording studios, green screen facilities, and production spaces to bring their creative vision to life.",
  logo: {
    dark: logo.src,
    light: "/ruixen-ui-nw.png",
  },
  contact: {
    email: "support@ruixen ui",
    phone: "+1 (555) 123-4567",
  },
  socials: [
    { icon: Github, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Instagram, href: "#" },
  ],
  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Production Library", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Events", href: "#" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
        { label: "API Reference", href: "#" },
      ],
    },
  ],
  copyright: "© 2024 ruixen ui. All rights reserved.",
};

export default function FooterPro(props?: FooterProProps) {
  const config: FooterProProps = { ...defaultProps, ...props };

  const socials = config.socials ?? [];
  const columns = config.columns ?? [];

  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white px-6 py-14 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto ">
        {/* Top Section: Logo + Description */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10
       "
        >
          <div className="flex flex-col">
            <div className="mb-12 ">
              {config.logo && (
                <>
                  <Image
                    src={config.logo.dark}
                    alt="Logo"
                    width={200}
                    height={50}
                    className="hidden dark:block h-auto w-auto"
                  />
                  <Image
                    src={config.logo.light}
                    alt="Logo"
                    width={180}
                    height={50}
                    className="block dark:hidden h-auto w-auto mb-4"
                  />
                </>
              )}
              <p className="text-start text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg ">
                {config.description}
              </p>
            </div>

            <div className=" flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
              {/* Columns */}
              <div className="grid grid-cols-2  gap-8 flex-1">
                {columns.map((col, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-medium mb-3">{col.title}</h3>
                    <ul className="space-y-2">
                      {col.links?.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className="text-[0.85rem] text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            {/* Right Side: Contact & Socials */}
            <div className="w-full md:max-w-lg md:mx-auto space-y-4">
              <Card className="shadow-none border-none">
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>
                    Let us know what you need. <br /> We can help you with
                    anything.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm font-medium mb-2 px-6">Get in Touch</p>
                  <CardContent>
                    <form>
                      <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Name</Label>
                          <Input
                            id="name"
                            type="name"
                            placeholder="Name"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center">
                            <Label htmlFor="password">Message</Label>
                          </div>
                          <Textarea />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  {config.contact && (
                    <div className="mt-5 px-6 text-sm text-gray-500 dark:text-gray-400">
                      Email: {config.contact.email} <br />
                      Phone: {config.contact.phone}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-transparent border-none">
                <CardContent className="flex flex-col justify-center items-center">
                  <p className="text-sm text-neutral-100 font-medium mb-2">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {socials.map(({ icon: Icon, href }, idx) => (
                      <Link
                        key={idx}
                        href={href}
                        className="text-gray-500 dark:text-gray-50 hover:text-blue-500 transition"
                      >
                        <Icon className="w-4 h-4" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>{config.copyright}</p>
          <div className="flex gap-6">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
