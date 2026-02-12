import React from "react";
import Image from "next/image";

const BentoGrid = () => {
  // You'll replace these with your actual studio images
  const images = [
    {
      src: "/hire/studio-1.jpg",
      alt: "Recording Studio Main Room",
    },
    {
      src: "/hire/studio-2.jpg",
      alt: "Green Screen Setup",
    },
    {
      src: "/hire/studio-3.jpg",
      alt: "Podcast Room",
    },
    {
      src: "/hire/studio-4.jpg",
      alt: "Film Production Stage",
    },
    {
      src: "/hire/studio-5.jpg",
      alt: "Equipment Room",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Studios
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take a look inside our world-class facilities designed for creators
            who demand excellence.
          </p>
        </div>

        {/* Bento Grid - Better Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Row 1 */}
          <div className="md:col-span-4 h-[400px] group relative overflow-hidden rounded-2xl bg-card border border-border">
            <div className="absolute inset-0">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">
                  {images[0].alt}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 h-[400px] group relative overflow-hidden rounded-2xl bg-card border border-border">
            <div className="absolute inset-0">
              <Image
                src={images[1].src}
                alt={images[1].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">
                  {images[1].alt}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="md:col-span-2 h-[300px] group relative overflow-hidden rounded-2xl bg-card border border-border">
            <div className="absolute inset-0">
              <Image
                src={images[2].src}
                alt={images[2].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">
                  {images[2].alt}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 h-[300px] group relative overflow-hidden rounded-2xl bg-card border border-border">
            <div className="absolute inset-0">
              <Image
                src={images[3].src}
                alt={images[3].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">
                  {images[3].alt}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 h-[300px] group relative overflow-hidden rounded-2xl bg-card border border-border">
            <div className="absolute inset-0">
              <Image
                src={images[4].src}
                alt={images[4].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">
                  {images[4].alt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200">
            Schedule a Studio Tour
          </button>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
