"use client";

import React, { useState } from "react";

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedStudio, setSelectedStudio] = useState<string>("");

  const studios = [
    { id: "recording", name: "Recording Studio A", price: "$150/hr" },
    { id: "greenscreen", name: "Green Screen Studio", price: "$200/hr" },
    { id: "film", name: "Film Production Stage", price: "$300/hr" },
    { id: "podcast", name: "Podcast Room", price: "$100/hr" },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log({ selectedDate, selectedTime, selectedStudio });
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Session
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select your preferred studio, date, and time. We'll confirm your
            booking within 24 hours.
          </p>
        </div>

        {/* Booking Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Studio Selection */}
            <div>
              <label className="block text-foreground font-semibold mb-4 text-lg">
                Choose Your Studio
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studios.map((studio) => (
                  <button
                    key={studio.id}
                    type="button"
                    onClick={() => setSelectedStudio(studio.id)}
                    className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedStudio === studio.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {studio.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Professional equipment included
                        </p>
                      </div>
                      <span className="text-primary font-bold">
                        {studio.price}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-foreground font-semibold mb-4 text-lg">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-4 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-foreground font-semibold mb-4 text-lg">
                Choose Time Slot
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            </div>

            {/* ID Upload */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Upload ID Copy <span className="text-destructive">*</span>
              </label>
              <p className="text-sm text-muted-foreground mb-3">
                Please upload a clear copy of your government-issued ID
                (Driver's License, Passport, or National ID)
              </p>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="w-full p-4 rounded-xl border-2 border-dashed border-border bg-card text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-semibold hover:file:bg-primary/90 file:cursor-pointer cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Accepted formats: JPG, PNG, PDF (Max 5MB)
              </p>
            </div>

            {/* Vehicle Registration (Optional) */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Vehicle Registration{" "}
                <span className="text-muted-foreground text-sm font-normal">
                  (Optional)
                </span>
              </label>
              <p className="text-sm text-muted-foreground mb-3">
                If you're driving to the studio, please provide your vehicle
                registration number for parking access
              </p>
              <input
                type="text"
                placeholder="e.g., ABC-1234 or CA 1ABC234"
                className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your project or any special requirements..."
                className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <p>
                  📞 Need help? Call us at{" "}
                  <span className="text-primary font-semibold">
                    (555) 123-4567
                  </span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-semibold text-foreground mb-2">
              Instant Confirmation
            </h4>
            <p className="text-sm text-muted-foreground">
              Get confirmed within 24 hours
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold text-foreground mb-2">
              Secure Payment
            </h4>
            <p className="text-sm text-muted-foreground">
              Pay securely online or in person
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl mb-2">🔄</div>
            <h4 className="font-semibold text-foreground mb-2">
              Flexible Cancellation
            </h4>
            <p className="text-sm text-muted-foreground">
              Free cancellation up to 48hrs before
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
