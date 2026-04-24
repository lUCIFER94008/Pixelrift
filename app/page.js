"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Zap, Shield, 
  Rocket, CheckCircle2, Layout,
  MessageSquare, User, Mail, Send, Loader2, Code2, Globe, Cpu
} from 'lucide-react';
import Link from 'next/link';
import Pricing from '@/components/Pricing';
import axios from 'axios';
import toast from 'react-hot-toast';

/* ─────────────── DATA ─────────────── */

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Scalability",
    desc: "Infrastructure designed to handle millions of users with sub-second latency.",
    color: "primary"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Enterprise Security",
    desc: "Bank-grade encryption and security protocols for your digital assets.",
    color: "secondary"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI-Driven UX",
    desc: "Intelligent interfaces that adapt to user behavior in real-time.",
    color: "primary"
  }
];

/* ─────────────── COMPONENTS ─────────────── */

const SectionTitle = ({ subtitle, title, centered = true }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
        <Sparkles className="w-3 h-3" /> {subtitle}
      </span>
      <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
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
    <div className="relative bg-[#0B0F19] min-h-screen overflow-x-hidden">
      {/* ══════════ 1. HERO SECTION ══════════ */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-white/10 shadow-xl shadow-primary/5">
                <Zap className="w-4 h-4 text-primary animate-pulse" /> The Future of Web Engineering
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tight">
                Engineering <br />
                <span className="text-accent-gradient">Digital Dominance</span>
              </h1>
              
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 font-medium max-w-xl mx-auto lg:mx-0">
                Building hyper-performance web platforms and digital ecosystems for the next generation of industry leaders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                <Link href="/projects" className="btn-glow px-10 py-5 rounded-2xl text-lg group w-full sm:w-auto">
                  Explore Ecosystem <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/#pricing" className="btn-outline-dark px-10 py-5 rounded-2xl text-lg w-full sm:w-auto">
                  View Plans
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Abstract Shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                {/* Floating Elements */}
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[3rem] blur-2xl opacity-50"
                />
                <div className="absolute inset-0 glass-card flex items-center justify-center p-8">
                  <div className="relative w-full h-full border border-white/10 rounded-[2rem] overflow-hidden">
                    <img 
                      src="/hero_illustration.png" 
                      alt="Future Tech" 
                      className="w-full h-full object-cover opacity-60 brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                  </div>
                </div>

                {/* Orbiting Icons */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 p-4 glass-card shadow-2xl shadow-primary/20">
                    <Code2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute bottom-1/2 -left-6 translate-y-1/2 p-4 glass-card shadow-2xl shadow-secondary/20">
                    <Layout className="w-8 h-8 text-secondary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. CORE FEATURES ══════════ */}
      <section id="features" className="py-24 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionTitle subtitle="Capabilities" title="Engineered for Impact" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-10 group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 ${
                  feature.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. PRICING ══════════ */}
      <section id="pricing" className="py-32 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionTitle subtitle="Value" title="Strategic Growth Plans" />
          <Pricing />
        </div>
      </section>

      {/* ══════════ 4. CONTACT FORM ══════════ */}
      <section id="contact" className="py-32 bg-[#111827] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
          <SectionTitle subtitle="Connect" title="Initiate Deployment" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-16 border-white/5"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Request Transmitted</h3>
                <p className="text-gray-400 font-medium">Our engineers will analyze your requirements within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
                >
                  Send Another Transmission →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="dark-input pl-12"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="dark-input pl-12"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-gray-600" />
                    <textarea 
                      required
                      placeholder="Detail your project vision..."
                      className="dark-input pl-12 min-h-[160px] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-glow w-full py-5 text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Launch Project Inquiry</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
