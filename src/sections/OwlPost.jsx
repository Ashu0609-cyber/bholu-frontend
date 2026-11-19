import React, { useState } from "react";
import { FiMail, FiSend, FiLinkedin, FiGithub, FiMapPin, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { PORTFOLIO_DATA } from "../data/portfolioData.js";

export default function OwlPost() {
  const { personal, photography } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    // Simulate owl post dispatch or mailto hook
    setTimeout(() => {
      setStatus("sent");
      // Create mailto fallback link for convenience
      const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
        `[Owl Post from ${formData.name}]: ${formData.subject || "Portfolio Inquiry"}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, "_blank");
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-midnight overflow-hidden">
      {/* Background photographic castle in twilight */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img
          src={photography.castleMist}
          alt="Historic Castle in twilight"
          className="w-full h-full object-cover filter brightness-40"
        />
        <div className="absolute inset-0 bg-midnight/90" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chamber border border-gold/20 mb-3">
            <span className="text-gold text-xs">🦉</span>
            <span className="font-cinzel text-xs uppercase tracking-widest text-gold font-semibold">
              Section VII • Owl Post
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-parchment tracking-tight mb-4">
            DISPATCH AN <span className="text-gold-gradient">OWL</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-parchment-muted leading-relaxed">
            Whether inquiring about AI engineering roles, technical collaboration, or deep learning architectures, I welcome your message.
          </p>
        </div>

        {/* Two Column Layout: Contact Details & Letterform */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Invocations */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-gilded rounded-2xl p-7 flex flex-col gap-6">
              <h3 className="font-cinzel text-xl font-bold text-parchment border-b border-line pb-3">
                Direct Channels
              </h3>

              <div className="space-y-4 font-body">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-stone/70 border border-line hover:border-gold/40 text-parchment hover:text-gold transition-colors focus-ring"
                >
                  <div className="w-10 h-10 rounded-lg bg-chamber border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <FiMail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-parchment-faint uppercase block">Electronic Mail</span>
                    <span className="text-xs sm:text-sm font-medium truncate block">{personal.email}</span>
                  </div>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-stone/70 border border-line hover:border-gold/40 text-parchment hover:text-gold transition-colors focus-ring"
                >
                  <div className="w-10 h-10 rounded-lg bg-chamber border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <FiLinkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-parchment-faint uppercase block">Professional Network</span>
                    <span className="text-xs sm:text-sm font-medium">Ashutosh Thakur</span>
                  </div>
                </a>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-stone/70 border border-line hover:border-gold/40 text-parchment hover:text-gold transition-colors focus-ring"
                >
                  <div className="w-10 h-10 rounded-lg bg-chamber border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <FiGithub size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-parchment-faint uppercase block">Code Vault</span>
                    <span className="text-xs sm:text-sm font-medium">@Ashu0609-cyber</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-stone/70 border border-line text-parchment">
                  <div className="w-10 h-10 rounded-lg bg-chamber border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-parchment-faint uppercase block">Location</span>
                    <span className="text-xs sm:text-sm font-medium">{personal.location}</span>
                  </div>
                </div>
              </div>

              {/* Slytherin touch reminder */}
              <div className="p-3 rounded-lg bg-emerald/20 border border-slytherin-subtle text-[11px] text-silver leading-relaxed font-body">
                ⚡ Seeking opportunities as an <strong>AI/ML Engineer</strong> or <strong>Generative AI Developer</strong> with teams building mission-critical architectures.
              </div>
            </div>
          </div>

          {/* Right Column: Parchment Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-gilded rounded-2xl p-7 sm:p-9 relative">
              <h3 className="font-cinzel text-xl font-bold text-parchment mb-1">
                Dispatch Your Letter
              </h3>
              <p className="text-xs text-parchment-muted mb-6 font-body">
                Fill the fields below to send a direct communication.
              </p>

              {status === "sent" ? (
                <div className="p-6 rounded-xl bg-emerald/20 border border-emerald/50 text-center flex flex-col items-center gap-3">
                  <FiCheckCircle className="text-emerald-glow text-3xl" />
                  <h4 className="font-cinzel text-lg font-bold text-parchment">Owl Dispatched!</h4>
                  <p className="text-xs text-parchment-muted max-w-sm">
                    Your message has been addressed and prepared for delivery to {personal.email}.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-2 px-4 py-2 rounded-lg bg-chamber border border-line text-xs font-cinzel text-gold hover:border-gold"
                  >
                    Send Another Owl
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-body text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-wider text-parchment-muted mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Albus Dumbledore"
                        className="w-full px-4 py-3 rounded-xl bg-stone/90 border border-line focus:border-gold focus:ring-1 focus:ring-gold text-parchment placeholder:text-parchment-faint text-xs outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-wider text-parchment-muted mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-stone/90 border border-line focus:border-gold focus:ring-1 focus:ring-gold text-parchment placeholder:text-parchment-faint text-xs outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-parchment-muted mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. AI Engineering Opportunity / Technical Discussion"
                      className="w-full px-4 py-3 rounded-xl bg-stone/90 border border-line focus:border-gold focus:ring-1 focus:ring-gold text-parchment placeholder:text-parchment-faint text-xs outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-parchment-muted mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your parchment here..."
                      className="w-full px-4 py-3 rounded-xl bg-stone/90 border border-line focus:border-gold focus:ring-1 focus:ring-gold text-parchment placeholder:text-parchment-faint text-xs outline-none transition-all resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/40 p-3 rounded-lg border border-red-800">
                      <FiAlertCircle />
                      <span>Please complete all required fields before dispatching.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl bg-gold-gradient text-midnight font-cinzel text-xs font-bold tracking-widest uppercase shadow-gold-glow hover:brightness-110 transition-all focus-ring flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <FiSend size={15} />
                    <span>{status === "sending" ? "Dispatching Owl..." : "Send via Owl Post"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
