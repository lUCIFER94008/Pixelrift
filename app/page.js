"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Zap, Shield, 
  BarChart3, Globe, Code2, Rocket,
  CheckCircle2, Star, Palette, Layout,
  MessageSquare, User, Mail, Send, Loader2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import axios from 'axios';
import toast from 'react-hot-toast';

/* ─────────────── DATA ─────────────── */

const brandingServices = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Visual Identity",
    desc: "Unique logos and color systems that define your brand essence.",
    color: "primary"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "UI/UX Design",
    desc: "Delightful interfaces built for maximum conversion and engagement.",
    color: "secondary"
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Web Platforms",
    desc: "High-performance websites built with the latest technologies.",
    color: "primary"
  }
];

const colorPalette = [
  { name: "Neon Indigo", hex: "#6366f1" },
  { name: "Royal Purple", hex: "#a855f7" },
  { name: "Slate Deep", hex: "#0f172a" },
  { name: "Pure White", hex: "#ffffff" },
  { name: "Glass Border", hex: "rgba(255,255,255,0.1)" }
];

/* ─────────────── COMPONENTS ─────────────── */

const SectionTitle = ({ subtitle, title, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
        <Sparkles className="w-3 h-3" /> {subtitle}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
    </motion.div>
  </div>
);

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post('/api/book', {
        ...formData,
        projectName: 'General Inquiry',
        plan: 'Contact Form',
        price: 'N/A'
      });
      if (resp.data.success) {
        setSubmitted(true);
        toast.success("Message sent! We'll get back to you soon.");
        setTimeout(() => {
          if (resp.data.whatsappUrl) window.open(resp.data.whatsappUrl, '_blank');
        }, 1500);
      }
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Navbar />

      {/* ══════════ 1. HERO SECTION ══════════ */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-8">
                <Zap className="w-4 h-4 fill-primary" /> Future-Ready Digital Agency
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
                Build Your Business <br />
                <span className="text-gradient">Website Instantly</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-medium">
                Premium, high-performance web solutions and branding for modern enterprises. Scalable, secure, and stunning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/projects" className="btn-glass bg-gradient text-white flex items-center justify-center gap-3 group">
                  Start Building <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/branding" className="btn-glass hover:bg-white/10 flex items-center justify-center gap-3">
                  Our Services
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Hero Illustration/Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="glass rounded-px-lg p-4 glossy">
                <img 
                  src="/hero_illustration.png" 
                  alt="Pixelrift Hero" 
                  className="w-full h-auto rounded-[2rem] object-cover shadow-2xl shadow-primary/10"
                />
                {/* Floaties */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 glass p-6 rounded-3xl glossy"
                >
                   <Rocket className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 15, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl glossy"
                >
                   <Shield className="w-8 h-8 text-secondary" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] -z-10 rounded-full" />
      </section>

      {/* ══════════ 2. BRANDING SERVICES ══════════ */}
      <section id="services" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionTitle subtitle="Excellence" title="Our Branding Services" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {brandingServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass glass-hover p-10 rounded-px-lg glossy group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 ${
                  service.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. COLOR PALETTE ══════════ */}
      <section className="py-24 relative overflow-hidden bg-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionTitle subtitle="Design Systems" title="Curated Brand Aesthetics" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
            {colorPalette.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="min-w-[280px] md:min-w-[220px] glass p-6 rounded-3xl glossy flex items-center gap-4 group"
              >
                <div 
                  className="w-12 h-12 rounded-xl shadow-inner border border-white/10" 
                  style={{ background: item.hex }} 
                />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.name}</h4>
                  <p className="text-gray-500 text-[10px] font-mono font-bold uppercase tracking-widest">{item.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. PRICING ══════════ */}
      <section id="pricing" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionTitle subtitle="Value" title="Enterprise Ready Plans" />
          <Pricing />
        </div>
      </section>

      {/* ══════════ 5. CONTACT FORM ══════════ */}
      <section id="contact" className="py-24 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <SectionTitle subtitle="Connect" title="Start Your Digital Journey" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-px-lg p-8 md:p-16 glossy relative"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
                <p className="text-gray-400 font-medium">We&apos;ll be in touch within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Send Another Message →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="glass-input pl-12"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="glass-input pl-12"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-gray-500" />
                    <textarea 
                      required
                      placeholder="Tell us about your project vision..."
                      className="glass-input pl-12 min-h-[160px] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Branding Request</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
