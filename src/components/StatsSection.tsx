import React from "react";

const StatsSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      description: "From albums to films, podcasts to commercials",
    },
    {
      number: "10,000+",
      label: "Hours Recorded",
      description: "Of premium audio and video content",
    },
    {
      number: "200+",
      label: "Happy Clients",
      description: "Artists, creators, and production companies",
    },
    {
      number: "24/7",
      label: "Studio Access",
      description: "Book anytime that works for your schedule",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "4rem 4rem",
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 dark:bg-primary/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our studios have been the birthplace of countless creative projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              {/* Card */}
              <div className="relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300" />

                {/* Content */}
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold text-foreground mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to create something amazing?
          </p>
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 shadow-lg shadow-primary/25">
            Book Your Session Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
