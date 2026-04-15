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

/* ─────────────── FADE-IN HELPER ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────── PAGE ─────────────── */

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
    <div className="pb-16 sm:pb-24">

      {/* ══════════ 1. HERO ══════════ */}
      <section className="relative pt-32 sm:pt-44 pb-24 sm:pb-36 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 glass rounded-full text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8">
              <Sparkles className="inline w-3 h-3 mr-1 -mt-0.5" /> Branding Services
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-[1.05] tracking-tighter">
              Build a Powerful <br />
              <span className="text-gradient">Brand Identity</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-slate-400 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              We don&apos;t just build websites — we craft complete digital brands that stand out and
              leave a lasting impression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0">
              <a
                href="#pricing"
                className="w-full sm:w-auto bg-gradient text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:opacity-95 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20"
              >
                Start Your Brand <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto glass text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:bg-white/10 transition-all border border-white/10 text-center"
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
        {/* Decorative */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] sm:w-[1000px] h-[300px] sm:h-[600px] bg-primary/20 blur-[100px] sm:blur-[180px] rounded-full -z-10 opacity-60"></div>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-secondary/10 blur-[80px] sm:blur-[150px] rounded-full -z-10 opacity-40"></div>
      </section>

      {/* ══════════ 2. SERVICES ══════════ */}
      <section id="services" className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16 sm:mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 block">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">Our Branding Services</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass p-8 sm:p-10 rounded-2xl sm:rounded-3xl text-center glass-hover border-white/5 relative group cursor-default"
              >
                <div className={`inline-flex p-4 rounded-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  s.color === 'primary' ? 'bg-primary/10 text-primary' :
                  s.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                  'bg-accent/10 text-accent'
                }`}>
                  {s.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">{s.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 2.5 COLOR PALETTES ══════════ */}
      <section className="py-20 sm:py-32 relative border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16 sm:mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 block">
                Design Systems
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Color Palettes We Create</h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Carefully crafted color systems that define your brand identity.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {colorPalettes.map((palette, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="glass rounded-2xl sm:rounded-3xl border-white/5 overflow-hidden group cursor-default hover:scale-[1.03] hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.25)]"
              >
                {/* Color Swatches */}
                <div className="flex h-28 sm:h-36">
                  {palette.colors.map((c, j) => (
                    <div
                      key={j}
                      className="flex-1 transition-all duration-500 group-hover:flex-[1.3] hover:!flex-[2]"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>

                {/* Palette Info */}
                <div className="p-5 sm:p-6">
                  <h4 className="text-white font-bold text-sm sm:text-base mb-3 tracking-tight">{palette.name}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {palette.colors.map((c, j) => (
                      <span
                        key={j}
                        className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-white/[0.05] text-slate-400 border border-white/[0.06] select-all hover:bg-white/10 hover:text-white transition-colors cursor-text"
                      >
                        {c.hex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-12 sm:mt-16"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gradient text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold hover:opacity-90 transition-all group shadow-lg shadow-primary/20"
            >
              <Palette className="w-4 h-4" /> Request Custom Branding <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 3. PRICING ══════════ */}
      <section id="pricing" className="py-20 sm:py-32 relative border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16 sm:mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Branding Packages</h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Choose the plan that fits your vision. Every package is crafted to deliver maximum impact.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.key}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                onClick={() => setSelectedPlan(plan.key)}
                className={`relative p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] cursor-pointer transition-all duration-500 border-2 overflow-hidden group ${
                  plan.highlight
                    ? 'branding-plan-highlight'
                    : selectedPlan === plan.key
                      ? 'border-primary/40 bg-primary/5 glass'
                      : 'border-white/5 glass glass-hover'
                }`}
              >
                {/* Badge */}
                {plan.tag && (
                  <div className="absolute top-0 right-6 sm:right-8 bg-gradient px-4 py-1.5 rounded-b-xl text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest z-20">
                    {plan.tag}
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl mb-5 transition-colors ${
                  selectedPlan === plan.key || plan.highlight
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-slate-400'
                }`}>
                  {plan.icon}
                </div>

                <h3 className="text-white font-black text-lg sm:text-xl mb-1 tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹{plan.price}</span>
                  <span className="text-slate-500 text-xs font-bold">one-time</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-400 text-xs sm:text-sm">
                      <div className="bg-primary/20 p-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full text-center py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-[0.15em] transition-all ${
                    plan.highlight || selectedPlan === plan.key
                      ? 'bg-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 4. SHOWCASE ══════════ */}
      <section className="py-20 sm:py-32 relative border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16 sm:mb-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 block">
                Our Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">Branding Showcase</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {showcaseProjects.map((p, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/5"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <span className="text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
                    {p.category}
                  </span>
                  <h4 className="text-white font-black text-lg sm:text-xl tracking-tight">{p.title}</h4>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-full">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 5. CTA BANNER ══════════ */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 border-white/10 relative overflow-hidden text-center"
          >
            <Sparkles className="w-6 h-6 text-primary mx-auto mb-4" />
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
              Need branding + website together?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 sm:mb-10">
              Get the complete package — brand identity, UI/UX design, and a fully built website — all from one team.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 bg-gradient text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:opacity-95 transition-all group shadow-xl shadow-primary/20"
            >
              Get Full Package <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* decorative blurs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/15 blur-[80px] rounded-full -z-10"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary/15 blur-[80px] rounded-full -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ 6. CONTACT FORM ══════════ */}
      <section id="contact" className="py-20 sm:py-32 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {submitted ? (
              /* ── Success State ── */
              <div className="customization-card text-center py-12 sm:py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">Request Sent!</h3>
                <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
                  Our branding team will review your request and get in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Submit Another Request →
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <div className="customization-card">
                <div className="text-center mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-2 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4">
                    <Star className="w-4 h-4" /> Get Started
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-2">
                    Tell us about your brand
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-lg mx-auto">
                    Fill in your details and we&apos;ll craft the perfect branding package for you.
                  </p>
                  {activePlan && (
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-xs font-bold text-white">
                      <Crown className="w-3.5 h-3.5 text-primary" />
                      Selected: {activePlan.name} — ₹{activePlan.price}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" id="branding-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="customization-input-group">
                      <User className="customization-input-icon" />
                      <input
                        id="brand-name"
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="customization-input"
                      />
                    </div>
                    <div className="customization-input-group">
                      <Mail className="customization-input-icon" />
                      <input
                        id="brand-email"
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="customization-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="customization-input-group">
                      <Briefcase className="customization-input-icon" />
                      <input
                        id="brand-type"
                        type="text"
                        name="brandType"
                        placeholder="Brand Type (e.g. Startup, Café)"
                        value={formData.brandType}
                        onChange={handleChange}
                        className="customization-input"
                      />
                    </div>
                    <div className="customization-input-group">
                      <DollarSign className="customization-input-icon" />
                      <input
                        id="brand-budget"
                        type="text"
                        name="budget"
                        placeholder="Budget Range"
                        value={formData.budget}
                        onChange={handleChange}
                        className="customization-input"
                      />
                    </div>
                  </div>

                  <div className="customization-input-group customization-textarea-group">
                    <MessageSquare className="customization-input-icon customization-textarea-icon" />
                    <textarea
                      id="brand-message"
                      name="message"
                      placeholder="Tell us about your brand vision..."
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="customization-input customization-textarea"
                    />
                  </div>

                  <button
                    id="brand-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="customization-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Send Branding Request</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Decorative */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-secondary/10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
