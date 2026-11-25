import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, ArrowUpRight, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // Live Clock for Asia/Kolkata (Gandhinagar, IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    emailjs
      .send(
        'service_0oac6tr', // Service ID (Untouched)
        'template_82jgura', // Template ID (Untouched)
        {
          from_name: formData.name,
          from_email: formData.email,
          name: formData.name,
          email: formData.email,
          user_name: formData.name,
          user_email: formData.email,
          Name: formData.name,
          Email: formData.email,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'NHeaBhdtRrB19MEcy' // Public Key (Untouched)
      )
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((error) => {
        console.error('Email error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const socials = [
    { name: 'GitHub', href: 'https://github.com/harshitpandya-cg', icon: <FaGithub size={18} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/harshitpandya2911/', icon: <FaLinkedin size={18} /> },
    { name: 'Twitter (X)', href: 'https://x.com/HarshitP68223', icon: <FaTwitter size={18} /> },
    { name: 'YouTube', href: 'https://www.youtube.com/@harshitpandya2911', icon: <FaYoutube size={18} /> },
    { name: 'LeetCode', href: 'https://leetcode.com/u/harshit_pandya01/', icon: <SiLeetcode size={18} /> },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      data-theme="ink"
      className="relative py-24 sm:py-32 bg-[#0B0B08] text-[#E6E4DE] select-none scroll-mt-24 border-t border-[#8A8880]/20 z-10"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Top Status & Availability Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-10 border-b border-[#8A8880]/20 mb-14">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0552D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F0552D]" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#E6E4DE]">
              AVAILABLE FOR FULL-STACK &amp; UI/UX ROLES
            </span>
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-[#8A8880] flex items-center gap-3">
            <span>Gandhinagar, IN</span>
            <span>•</span>
            <span className="text-[#E6E4DE]">{currentTime} IST (UTC+05:30)</span>
          </div>
        </div>

        {/* Giant Two-Line CTA Headline */}
        <div className="mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F0552D] font-bold block mb-3">
            08 // GET IN TOUCH
          </span>
          <h2
            className="font-semibold tracking-[-0.04em] text-[#E6E4DE]"
            style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.9, textWrap: 'balance' }}
          >
            HAVE A PROJECT IN MIND? <br />
            <span className="text-[#F0552D]">LET'S BUILD IT.</span>
          </h2>
        </div>

        {/* Huge Magnetic Email Link */}
        <div className="pb-14 border-b border-[#8A8880]/20 mb-16">
          <a
            href="mailto:harshitpandya073@gmail.com"
            className="group inline-flex items-baseline gap-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#E6E4DE] hover:text-[#F0552D] transition-colors break-all"
          >
            <span>harshitpandya073@gmail.com</span>
            <ArrowUpRight size={32} className="text-[#F0552D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline shrink-0" />
          </a>
          <p className="font-mono text-xs text-[#8A8880] uppercase tracking-widest mt-3">
            TELEPHONE: +91 9428938303 // DIRECT INBOX
          </p>
        </div>

        {/* Main Grid: Working EmailJS Form & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Left Column: Direct Info & Social Directory */}
          <div className="space-y-10">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-5">
                LOCATION &amp; CONTACT SPECIFICATIONS
              </h3>
              <div className="space-y-3 font-mono text-xs sm:text-sm text-[#E6E4DE]">
                <div className="flex justify-between py-2 border-b border-[#8A8880]/15">
                  <span className="text-[#8A8880]">LOCATION</span>
                  <span>Gandhinagar, Gujarat, India</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#8A8880]/15">
                  <span className="text-[#8A8880]">PHONE</span>
                  <a href="tel:+919428938303" className="hover:text-[#F0552D] transition-colors">
                    +91 9428938303
                  </a>
                </div>
                <div className="flex justify-between py-2 border-b border-[#8A8880]/15">
                  <span className="text-[#8A8880]">PRIMARY EMAIL</span>
                  <a href="mailto:harshitpandya073@gmail.com" className="hover:text-[#F0552D] transition-colors">
                    harshitpandya073@gmail.com
                  </a>
                </div>
                <div className="flex justify-between py-2 border-b border-[#8A8880]/15">
                  <span className="text-[#8A8880]">EDUCATION</span>
                  <span>CodingGita (Btech CSE '29)</span>
                </div>
              </div>
            </div>

            {/* Ruled Social Directory */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-5">
                CONNECTED PLATFORMS &amp; CODE REPOSITORIES
              </h3>
              <div className="divide-y divide-[#8A8880]/15 border-y border-[#8A8880]/15">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 flex items-center justify-between text-xs sm:text-sm font-mono uppercase tracking-wider text-[#E6E4DE] hover:text-[#F0552D] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {s.icon}
                      <span>{s.name}</span>
                    </div>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive EmailJS Contact Form */}
          <div className="border border-[#8A8880]/20 rounded-2xl p-6 sm:p-8 md:p-10 bg-[#0B0B08] shadow-xl">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-6">
              TRANSMIT A DIRECT MESSAGE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-[#8A8880]">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-[#E6E4DE]/5 border border-[#8A8880]/25 px-4 py-3 rounded-lg font-mono text-sm text-[#E6E4DE] focus:outline-none focus:border-[#F0552D] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-[#8A8880]">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="alex@company.com"
                  className="w-full bg-[#E6E4DE]/5 border border-[#8A8880]/25 px-4 py-3 rounded-lg font-mono text-sm text-[#E6E4DE] focus:outline-none focus:border-[#F0552D] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="font-mono text-[10px] uppercase tracking-widest text-[#8A8880]">
                  Subject Line
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Consultation / Full-Stack Role"
                  className="w-full bg-[#E6E4DE]/5 border border-[#8A8880]/25 px-4 py-3 rounded-lg font-mono text-sm text-[#E6E4DE] focus:outline-none focus:border-[#F0552D] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-[#8A8880]">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your vision, timeline, and goals..."
                  className="w-full bg-[#E6E4DE]/5 border border-[#8A8880]/25 px-4 py-3 rounded-lg font-mono text-sm text-[#E6E4DE] focus:outline-none focus:border-[#F0552D] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-full bg-[#F0552D] text-[#0B0B08] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E6E4DE] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>TRANSMITTING MESSAGE...</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={14} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-3 rounded border border-emerald-500/40 bg-emerald-500/10 font-mono text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  <span>Message delivered successfully to Harshit Pandya.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 rounded border border-red-500/40 bg-red-500/10 font-mono text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>Transmission failed. Please reach out via direct email.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Footer Sub-Bar */}
        <div className="pt-8 border-t border-[#8A8880]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8880] uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-[#E6E4DE] text-[#0B0B08] flex items-center justify-center font-bold text-[10px]">
              HP
            </span>
            <span>&copy; 2026 HARSHIT PANDYA. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>BUILT WITH REACT &amp; THREE.JS</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#F0552D] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default React.memo(Footer);
