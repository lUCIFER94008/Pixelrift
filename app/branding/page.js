"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, CheckCircle2, Star,
  Paintbrush, Palette, Layout, Share2,
  Send, Loader2, User, Mail, MessageSquare,
  DollarSign, Briefcase, Crown, Zap, Eye
} from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─────────────── DATA ─────────────── */

const services = [
  {
    icon: <Paintbrush className="w-7 h-7" />,
    title: "Logo Design",
    desc: "Unique, memorable logos that capture your brand essence and set you apart from the competition.",
    color: "primary"
  },
  {
    icon: <Palette className="w-7 h-7" />,
    title: "Brand Identity",
    desc: "Complete brand systems — colors, typography, imagery — all crafted for consistency and impact.",
    color: "secondary"
  },
  {
    icon: <Layout className="w-7 h-7" />,
    title: "UI/UX Design",
    desc: "Pixel-perfect interfaces built for delightful user experiences and maximum conversion.",
    color: "accent"
  },
  {
    icon: <Share2 className="w-7 h-7" />,
    title: "Social Media Branding",
    desc: "Cohesive social media kits that elevate your online presence across every platform.",
    color: "primary"
  },
];

const plans = [
  {
    key: "starter",
    name: "Starter Brand",
    price: "2,999",
    tag: null,
    features: ["Logo design", "Color palette", "Basic typography"],
    icon: <Zap className="w-6 h-6" />,
    highlight: false,
  },
  {
    key: "business",
    name: "Business Brand",
    price: "5,999",
    tag: null,
    features: ["Logo design", "Brand identity kit", "Social media kit", "Typography & colors"],
    icon: <Briefcase className="w-6 h-6" />,
    highlight: false,
  },
  {
    key: "premium",
    name: "Premium Brand",
    price: "9,999",
    tag: "Best Value",
    features: ["Everything in Business", "UI/UX design (landing page)", "Brand guidelines", "Priority support"],
    icon: <Crown className="w-6 h-6" />,
    highlight: true,
  },
];

const showcaseProjects = [
  {
    title: "Luxe Fashion",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "GreenLeaf Wellness",
    category: "Logo + Social Media",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "TechNova App",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Café Aroma",
    category: "Full Branding",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80",
  },
];

const colorPalettes = [
  {
    name: "Modern Purple",
    colors: [
      { hex: "#6C63FF", light: false },
      { hex: "#8B5CF6", light: false },
      { hex: "#A78BFA", light: false },
      { hex: "#C4B5FD", light: true },
      { hex: "#EDE9FE", light: true },
    ],
  },
  {
    name: "Luxury Gold",
    colors: [
      { hex: "#D4AF37", light: false },
      { hex: "#FFD700", light: true },
      { hex: "#FFF5CC", light: true },
      { hex: "#1F2937", light: false },
      { hex: "#111827", light: false },
    ],
  },
  {
    name: "Dark Tech",
    colors: [
      { hex: "#0F172A", light: false },
      { hex: "#1E293B", light: false },
      { hex: "#334155", light: false },
      { hex: "#6366F1", light: false },
      { hex: "#22D3EE", light: false },
    ],
  },
  {
    name: "Minimal Clean",
    colors: [
      { hex: "#FFFFFF", light: true },
      { hex: "#F1F5F9", light: true },
      { hex: "#E2E8F0", light: true },
      { hex: "#64748B", light: false },
      { hex: "#0F172A", light: false },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BrandingPage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brandType: '',
    budget: '',
    message: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const activePlan = plans.find((p) => p.key === selectedPlan);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await axios.post('/api/book', {
        name: formData.name,
        email: formData.email,
        phone: '',
        budget: formData.budget,
        message: `Brand Type: ${formData.brandType}\n\n${formData.message}`,
        projectName: 'Branding Service',
        plan: activePlan?.name || 'Branding Service',
        price: `₹${activePlan?.price || 'Custom'}`,
      });

      if (resp.data.success) {
        setSubmitted(true);
        toast.success('Branding request sent successfully!');
        setFormData({ name: '', email: '', brandType: '', budget: '', message: '' });
        setTimeout(() => {
          if (resp.data.whatsappUrl) {
            window.open(resp.data.whatsappUrl, '_blank');
          }
        }, 1200);
      }
    } catch {
      toast.error('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-24">
        
        {/* ══════════ 1. HERO ══════════ */}
        <section className="py-20 md:py-32 border-b border-white/5 mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 glass rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Sparkles className="inline w-3 h-3 mr-1 -mt-0.5" /> Branding Services
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Build a Powerful <br />
                <span className="text-gradient">Brand Identity</span>
              </h1>
              <p className="text-gray-400 leading-relaxed text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                We don&apos;t just build websites — we craft complete digital brands that stand out and
                leave a lasting impression.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="#pricing"
                  className="bg-gradient text-white px-10 py-5 rounded-2xl text-lg font-bold hover:opacity-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                  Start Your Brand <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#services"
                  className="glass text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all border border-white/10 text-center"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>
        </section>

        {/* ══════════ 2. SERVICES ══════════ */}
        <section id="services" className="py-20 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Our Branding Services</h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass p-8 rounded-px-lg text-center border-white/5 relative group glossy"
              >
                <div className={`inline-flex p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 ${
                  s.color === 'primary' ? 'bg-primary/10 text-primary' :
                  s.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                  'bg-accent/10 text-accent'
                }`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 3. COLOR PALETTES ══════════ */}
        <section className="py-20 border-t border-white/5 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                Design Systems
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Color Palettes We Create</h2>
              <p className="text-gray-400 leading-relaxed max-w-xl mx-auto text-lg font-medium">
                Carefully crafted color systems that define your brand identity.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {colorPalettes.map((palette, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass rounded-px-lg border-white/5 overflow-hidden group hover:scale-[1.03] transition-all duration-500 glossy"
              >
                <div className="flex h-32">
                  {palette.colors.map((c, j) => (
                    <div
                      key={j}
                      className="flex-1 transition-all duration-500 group-hover:flex-[1.3] hover:!flex-[2]"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <div className="p-6">
                  <h4 className="text-white font-bold mb-3">{palette.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((c, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-white/5 text-gray-500 border border-white/10"
                      >
                        {c.hex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 4. PRICING ══════════ */}
        <section id="pricing" className="py-20 border-t border-white/5 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Branding Packages</h2>
              <p className="text-gray-400 leading-relaxed max-w-xl mx-auto text-lg font-medium">
                Choose the plan that fits your vision. Every package is crafted to deliver maximum impact.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                onClick={() => setSelectedPlan(plan.key)}
                className={`relative p-10 rounded-px-lg cursor-pointer transition-all duration-500 border-2 overflow-hidden glass glossy ${
                  plan.highlight
                    ? 'ring-2 ring-primary border-primary/50 shadow-2xl shadow-primary/20 scale-[1.05] z-10'
                    : selectedPlan === plan.key
                      ? 'border-primary/40 bg-primary/5'
                      : 'border-white/5 hover:border-white/10'
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 right-8 bg-gradient px-4 py-1.5 rounded-b-xl text-white text-[8px] font-black uppercase tracking-widest z-20">
                    {plan.tag}
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl mb-6 transition-colors ${
                  selectedPlan === plan.key || plan.highlight
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-gray-500'
                }`}>
                  {plan.icon}
                </div>

                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-white">₹{plan.price}</span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">/ Project</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight || selectedPlan === plan.key ? 'text-primary' : 'text-gray-600'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                    plan.highlight || selectedPlan === plan.key
                      ? 'bg-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 5. SHOWCASE ══════════ */}
        <section className="py-20 border-t border-white/5 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                Our Portfolio
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Branding Showcase</h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProjects.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-px-lg glass border border-white/5 glossy"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
                    {p.category}
                  </span>
                  <h4 className="text-white font-bold text-xl">{p.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 6. CONTACT SECTION ══════════ */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              {submitted ? (
                <div className="glass p-12 rounded-px-lg text-center glossy">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">Request Sent!</h3>
                  <p className="text-gray-400 font-medium mb-8">
                    Our branding team will review your request and get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-black uppercase text-xs tracking-widest hover:text-white transition-all"
                  >
                    Submit Another Request →
                  </button>
                </div>
              ) : (
                <div className="glass p-8 md:p-12 rounded-px-lg border-white/5 glossy">
                  <div className="text-center mb-10">
                    <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Get Started</span>
                    <h3 className="text-3xl font-bold text-white mb-2">Tell us about your brand</h3>
                    <p className="text-gray-500 font-medium text-sm">Fill in your details and we&apos;ll craft the perfect branding package for you.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe *"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
                          <Mail className="w-3 h-3 text-primary" /> Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com *"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="glass-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
                          <Briefcase className="w-3 h-3 text-primary" /> Brand Type
                        </label>
                        <input
                          type="text"
                          name="brandType"
                          placeholder="Startup, Cafe, etc."
                          value={formData.brandType}
                          onChange={handleChange}
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
                          <DollarSign className="w-3 h-3 text-primary" /> Budget Range
                        </label>
                        <input
                          type="text"
                          name="budget"
                          placeholder="Expected budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="glass-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 px-2">
                        <MessageSquare className="w-3 h-3 text-primary" /> Brand Vision
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your brand vision..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="glass-input min-h-[160px] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Branding Request</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
