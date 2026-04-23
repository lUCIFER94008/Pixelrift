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
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <section className="py-20 md:py-32 border-b border-gray-100 mb-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8">
                <Sparkles className="inline w-3 h-3 mr-1 -mt-0.5" /> Branding Services
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-dark mb-8 leading-tight">
                Build a Powerful <span className="text-gradient">Brand Identity</span>
              </h1>
              <p className="text-gray-text leading-relaxed text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
                We don&apos;t just build websites — we craft complete digital brands that stand out and
                leave a lasting impression.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#pricing"
                  className="bg-gradient text-white px-10 py-5 rounded-xl text-lg font-bold hover:opacity-95 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                  Start Your Brand <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#services"
                  className="bg-white text-dark border border-gray-200 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all text-center"
                >
                  Explore Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark">Our Branding Services</h2>
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
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md text-center"
              >
                <div className={`inline-flex p-4 rounded-xl mb-6 ${
                  s.color === 'primary' ? 'bg-primary/5 text-primary' :
                  s.color === 'secondary' ? 'bg-purple-50 text-purple-600' :
                  'bg-indigo-50 text-indigo-600'
                }`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">{s.title}</h3>
                <p className="text-gray-text leading-relaxed text-sm font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Color Palettes Section */}
        <section className="py-20 border-t border-gray-100 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                Design Systems
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">Color Palettes We Create</h2>
              <p className="text-gray-text leading-relaxed max-w-xl mx-auto text-lg font-medium">
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
                className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-all"
              >
                <div className="flex h-32">
                  {palette.colors.map((c, j) => (
                    <div
                      key={j}
                      className="flex-1 transition-all duration-300 group-hover:flex-[1.2]"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                <div className="p-6">
                  <h4 className="text-dark font-bold mb-3">{palette.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((c, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-gray-50 text-gray-400 border border-gray-100"
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

        {/* Pricing Section */}
        <section id="pricing" className="py-20 border-t border-gray-100 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">Branding Packages</h2>
              <p className="text-gray-text leading-relaxed max-w-xl mx-auto text-lg font-medium">
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
                className={`relative p-10 rounded-2xl cursor-pointer transition-all border-2 ${
                  plan.highlight
                    ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                    : selectedPlan === plan.key
                      ? 'border-primary bg-gray-50 shadow-lg'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 right-8 bg-gradient px-4 py-1.5 rounded-b-xl text-white text-[8px] font-bold uppercase tracking-widest z-20">
                    {plan.tag}
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl mb-6 ${
                  selectedPlan === plan.key || plan.highlight
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {plan.icon}
                </div>

                <h3 className="text-dark font-bold text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-bold text-dark">₹{plan.price}</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">one-time</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-text text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${
                    plan.highlight || selectedPlan === plan.key
                      ? 'bg-gradient text-white shadow-lg shadow-primary/20'
                      : 'bg-gray-50 text-dark border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-20 border-t border-gray-100 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
                Our Portfolio
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark">Branding Showcase</h2>
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
                className="group relative overflow-hidden rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">
                    {p.category}
                  </span>
                  <h4 className="text-white font-bold text-xl">{p.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              {submitted ? (
                <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-2xl text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-dark mb-4">Request Sent!</h3>
                  <p className="text-gray-text font-medium mb-8">
                    Our branding team will review your request and get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-bold uppercase text-xs tracking-widest hover:opacity-80 transition-opacity"
                  >
                    Submit Another Request →
                  </button>
                </div>
              ) : (
                <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-2xl shadow-dark/5">
                  <div className="text-center mb-10">
                    <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Get Started</span>
                    <h3 className="text-3xl font-bold text-dark mb-2">Tell us about your brand</h3>
                    <p className="text-gray-text font-medium text-sm">Fill in your details and we&apos;ll craft the perfect branding package for you.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe *"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                          <Mail className="w-3 h-3 text-primary" /> Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com *"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                          <Briefcase className="w-3 h-3 text-primary" /> Brand Type
                        </label>
                        <input
                          type="text"
                          name="brandType"
                          placeholder="Brand Type (e.g. Startup, Café)"
                          value={formData.brandType}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                          <DollarSign className="w-3 h-3 text-primary" /> Budget Range
                        </label>
                        <input
                          type="text"
                          name="budget"
                          placeholder="Budget Range"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare className="w-3 h-3 text-primary" /> Brand Vision
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your brand vision..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient text-white py-5 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50"
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
    </div>
  );
}
