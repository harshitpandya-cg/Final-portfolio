import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    
    emailjs.send(
      'service_0oac6tr', // Service ID
      'template_82jgura', // Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        name: formData.name, 
        email: formData.email,
        user_name: formData.name, // Common EmailJS variable
        user_email: formData.email, // Common EmailJS variable
        Name: formData.name, // Capitalized version
        Email: formData.email, // Capitalized version
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      'NHeaBhdtRrB19MEcy' // Public Key
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

  const socials = [    { name: 'GitHub', icon: <FaGithub size={20} />, href: 'https://github.com/harshitpandya-cg', color: 'lg:hover:bg-[#333]' },
    { name: 'LinkedIn', icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/harshitpandya2911/', color: 'lg:hover:bg-[#0077b5]' },
    { name: 'Twitter', icon: <FaTwitter size={20} />, href: 'https://x.com/HarshitP68223', color: 'lg:hover:bg-[#1da1f2]' },
    { name: 'YouTube', icon: <FaYoutube size={20} />, href: 'https://www.youtube.com/@harshitpandya2911', color: 'lg:hover:bg-[#ff0000]' },
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-secondary font-bold tracking-widest uppercase text-xs"
          >
            Let's Connect
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight"
          >
            Contact Me
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-16 max-w-6xl mx-auto">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white leading-tight">Got a project? <br /> Let's discuss it over coffee.</h3>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                I'm always open to new opportunities, collaborations, and side projects. Feel free to reach out to me via email or phone.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-4 rounded-3xl group lg:hover:bg-white/5 transition-all">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 lg:group-hover:bg-primary/20 transition-all duration-300">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Email Me</p>
                  <a href="mailto:harshitpandya073@gmail.com" className="text-xl font-bold text-white lg:hover:text-primary transition-colors">harshitpandya073@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-4 rounded-3xl group lg:hover:bg-white/5 transition-all">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 lg:group-hover:bg-secondary/20 transition-all duration-300">
                  <Phone className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Call Me</p>
                  <p className="text-xl font-bold text-white">94289 *****</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 p-4 rounded-3xl group lg:hover:bg-white/5 transition-all">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 lg:group-hover:bg-accent/20 transition-all duration-300">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Location</p>
                  <p className="text-xl font-bold text-white">Gandhinagar, Gujarat, India</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/50 border border-white/10 transition-all duration-300 ${social.color} lg:hover:text-white lg:hover:scale-110`}
                  aria-label={`Visit my ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 glass-card p-10 rounded-[40px] border border-white/10 shadow-2xl shadow-primary/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-4">Full Name</label>
                  <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-3xl focus:outline-none focus:border-primary/50 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ring-0 focus:ring-4 focus:ring-primary/10" placeholder="Harshit Pandya" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-4">Email Address</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-3xl focus:outline-none focus:border-primary/50 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ring-0 focus:ring-4 focus:ring-primary/10" placeholder="harshit@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-4">Subject</label>
                <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-3xl focus:outline-none focus:border-primary/50 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ring-0 focus:ring-4 focus:ring-primary/10" placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-4">Your Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-3xl focus:outline-none focus:border-primary/50 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] resize-none ring-0 focus:ring-4 focus:ring-primary/10" placeholder="Tell me about your project..."></textarea>
              </div>
              <button type="submit" aria-label="Send message" disabled={status === 'loading'} className="w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-3xl font-bold text-lg text-white shadow-lg shadow-primary/25 lg:hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center space-x-3 group cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                {status === 'idle' && <Send size={20} className="lg:group-hover:translate-x-1 lg:group-hover:-translate-y-1 transition-transform" />}
                {status === 'success' && <CheckCircle2 size={20} className="text-green-300" />}
                {status === 'error' && <AlertCircle size={20} className="text-red-300" />}
              </button>
              
              {status === 'success' && <p className="text-center text-sm text-green-400 font-bold tracking-widest uppercase mt-4">Message sent successfully!</p>}
              {status === 'error' && <p className="text-center text-sm text-red-400 font-bold tracking-widest uppercase mt-4">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
