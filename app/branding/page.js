"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, CheckCircle2,
  Paintbrush, Palette, Layout, Share2,
  Send, Loader2, User, Mail, MessageSquare,
  DollarSign, Briefcase, Crown, Zap
} from 'lucide-react';
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
    name: "Pastel Elegance",
    colors: [
      { hex: "#E6C7C7", light: true },
      { hex: "#E9DED4", light: true },
      { hex: "#F3E4CF", light: true },
      { hex: "#E7C2A3", light: true },
      { hex: "#1A1A1A", light: false },
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
    <div className="relative min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        
        {/* ══════════ 1. HERO ══════════ */}
        <section className="py-20 md:py-32 border-b border-gray-100 mb-20 text-center bg-hero-gradient rounded-px-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto px-4"
            >
              <span className="inline-block px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full text-text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/20">
                <Sparkles className="inline w-3 h-3 mr-1 -mt-0.5 text-primary" /> Branding Services
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-text-primary mb-8 leading-tight">
                Build a Powerful <br />
                <span className="text-pastel-gradient">Brand Identity</span>
              </h1>
              <p className="text-text-secondary leading-relaxed text-lg md:text-xl mb-12 max-w-2xl mx-auto font-bold">
                We don&apos;t just build websites — we craft complete digital brands that stand out and
                leave a lasting impression.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="#pricing"
                  className="btn-pastel px-10 py-5 rounded-2xl text-lg shadow-xl shadow-primary/20"
                >
                  Start Your Brand <ArrowRight className="w-5 h-5 ml-2" />
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
              <h2 className="text-3xl md:text-5xl font-black text-text-primary">Our Branding Services</h2>
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
                className="pastel-card p-8 text-center group"
              >
                <div className={`inline-flex p-4 rounded-2xl mb-6 transition-transform group-hover:scale-110 ${
                  s.color === 'primary' ? 'bg-primary/10 text-primary' :
                  s.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                  'bg-orange-100 text-orange-500'
                }`}>
                  {s.icon}
                </div>
                <h3 className="text-xl font-black text-text-primary mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-text-secondary leading-relaxed text-sm font-bold">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 3. PRICING ══════════ */}
        <section id="pricing" className="py-20 border-t border-gray-100 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                Transparent Pricing
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary mb-6">Branding Packages</h2>
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
                className={`relative p-10 rounded-px-lg cursor-pointer transition-all duration-500 border flex flex-col h-full ${
                  plan.highlight
                    ? 'bg-hero-gradient border-primary/20 shadow-2xl shadow-primary/10 scale-105 z-10'
                    : selectedPlan === plan.key
                      ? 'bg-primary/5 border-primary/40'
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-xl shadow-dark/5'
                }`}
              >
                {plan.tag && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-b-xl text-[8px] font-black uppercase tracking-widest text-primary border border-t-0 border-primary/20 shadow-sm">
                    {plan.tag}
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl mb-6 transition-colors ${
                  selectedPlan === plan.key || plan.highlight
                    ? 'bg-white text-primary shadow-sm'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {plan.icon}
                </div>

                <h3 className="text-text-primary font-black text-xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-text-primary">₹{plan.price}</span>
                  <span className="text-text-secondary text-xs font-bold uppercase tracking-widest">/ Project</span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-text-secondary text-sm font-bold">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight || selectedPlan === plan.key ? 'text-text-primary' : 'text-primary'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                    plan.highlight || selectedPlan === plan.key
                      ? 'bg-white text-text-primary shadow-lg hover:bg-gray-50'
                      : 'btn-pastel shadow-lg shadow-primary/10'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 4. SHOWCASE ══════════ */}
        <section className="py-20 border-t border-gray-100 mb-20">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
                Our Portfolio
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-text-primary">Branding Showcase</h2>
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
                className="group relative overflow-hidden rounded-px-lg pastel-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.2em] block mb-2">
                    {p.category}
                  </span>
                  <h4 className="text-white font-black text-xl">{p.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══════════ 5. CONTACT SECTION ══════════ */}
        <section id="contact" className="py-20 border-t border-gray-100 bg-[#f8f8f8] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              {submitted ? (
                <div className="bg-white p-12 rounded-px-lg text-center shadow-xl">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-text-primary mb-4">Request Sent!</h3>
                  <p className="text-text-secondary font-bold mb-8">
                    Our branding team will review your request and get in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-black uppercase text-xs tracking-widest hover:text-text-primary transition-all"
                  >
                    Submit Another Request →
                  </button>
                </div>
              ) : (
                <div className="bg-white p-8 md:p-12 rounded-px-lg border border-gray-100 shadow-2xl">
                  <div className="text-center mb-10">
                    <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">Get Started</span>
                    <h3 className="text-3xl font-black text-text-primary mb-2">Tell us about your brand</h3>
                    <p className="text-text-secondary font-bold text-sm">Fill in your details and we&apos;ll craft the perfect branding package for you.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-2">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe *"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="pastel-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-2">
                          <Mail className="w-3 h-3 text-primary" /> Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="john@example.com *"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="pastel-input"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 px-2">
                        <MessageSquare className="w-3 h-3 text-primary" /> Brand Vision
                      </label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your brand vision..."
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="pastel-input min-h-[160px] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-pastel w-full py-5 text-xs uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-50"
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
