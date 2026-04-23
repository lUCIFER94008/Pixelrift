"use client";
import React from 'react';
import { 
  ShieldCheck, Zap, DollarSign, Headset, ArrowRight, Sparkles, 
  Layers, Palette, Layout, Smartphone, Send, CheckCircle2,
  Mail, Phone, User, Briefcase, IndianRupee, MessageSquare
} from 'lucide-react';
import Pricing from '@/components/Pricing';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const whyUs = [
    { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Custom Designs", desc: "Unique, tailor-made designs for your brand." },
    { icon: <Zap className="w-6 h-6 text-primary" />, title: "Fast Delivery", desc: "Get your project live within days, not months." },
    { icon: <DollarSign className="w-6 h-6 text-primary" />, title: "Affordability", desc: "Premium solutions at highly competitive prices." },
    { icon: <Headset className="w-6 h-6 text-primary" />, title: "Full Support", desc: "We're here to help you every step of the way." },
  ];

  const services = [
    { icon: <Palette className="w-8 h-8 text-primary" />, title: "Logo Design", desc: "Crafting memorable identities that stand out." },
    { icon: <Layers className="w-8 h-8 text-primary" />, title: "Brand Identity", desc: "Cohesive visual systems for your business." },
    { icon: <Layout className="w-8 h-8 text-primary" />, title: "UI/UX Design", desc: "User-centric interfaces that convert visitors." },
    { icon: <Smartphone className="w-8 h-8 text-primary" />, title: "Social Media", desc: "Engaging content for all digital platforms." },
  ];

  const sampleProjects = [
    {
      id: '1',
      title: "Venture Capital Platform",
      description: "A modern dashboard for VC firms to manage portfolios and investments.",
      category: "Web App",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      isLive: true,
      liveUrl: "#"
    },
    {
      id: '2',
      title: "EcoCommerce Store",
      description: "Sustainable fashion marketplace with a focus on minimal design.",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
      isLive: false
    }
  ];

  const colors = [
    { name: "Primary Purple", hex: "#7C3AED", bg: "bg-[#7C3AED]" },
    { name: "Secondary Purple", hex: "#A855F7", bg: "bg-[#A855F7]" },
    { name: "Soft Gray", hex: "#F8F9FB", bg: "bg-[#F8F9FB]", border: "border-gray-200" },
    { name: "Dark Text", hex: "#111827", bg: "bg-[#111827]" },
  ];

  return (
    <div className="bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Premium Digital Solutions
              </span>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-dark mb-8">
                Build Your <span className="text-gradient">Business Website</span> Instantly
              </h1>

              <p className="text-gray-text leading-relaxed text-lg md:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 font-medium">
                Skip the backlog and launch your business with a world-class digital product. 
                Premium ready-made web solutions with custom design and full support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/projects" className="bg-gradient text-white px-10 py-5 rounded-xl text-lg font-bold hover:opacity-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3">
                  Explore Projects <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/projects" className="bg-white text-dark border border-gray-200 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all text-center">
                  Browse Solutions
                </Link>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <img 
              src="/hero_illustration.png" 
              alt="Digital Agency Illustration" 
              className="w-full h-auto rounded-3xl"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"; }}
            />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-gray-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Featured Work</span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark">Recent Projects</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sampleProjects.map((p, i) => (
              <ProjectCard key={i} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Creative Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark">Branding Solutions</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm transition-all"
              >
                <div className="mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold text-dark mb-3">{s.title}</h3>
                <p className="text-gray-text text-sm font-medium leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* Color Palette Section */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Our Identity</span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark">Brand Color Palette</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {colors.map((c, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className={`w-full aspect-square rounded-lg mb-4 ${c.bg} ${c.border || ''}`}></div>
                <p className="text-dark font-bold text-sm mb-1">{c.name}</p>
                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-soft relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-8">
            Need branding + website together?
          </h2>
          <p className="text-gray-text text-lg mb-12 font-medium">
            Get the full package at a discounted rate and launch your brand with consistency.
          </p>
          <button className="bg-gradient text-white px-12 py-5 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all">
            Get Full Package
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Contact Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">Start Your Project</h2>
              <p className="text-gray-text font-medium">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-px-lg border border-gray-100 shadow-2xl shadow-dark/5"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3 text-primary" /> Full Name
                    </label>
                    <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-3 h-3 text-primary" /> Email Address
                    </label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                      <Phone className="w-3 h-3 text-primary" /> Phone Number
                    </label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                      <Briefcase className="w-3 h-3 text-primary" /> Brand Type
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium appearance-none">
                      <option>SaaS Platform</option>
                      <option>E-Commerce</option>
                      <option>Digital Agency</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                    <IndianRupee className="w-3 h-3 text-primary" /> Budget Range
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium appearance-none">
                    <option>₹10,000 - ₹25,000</option>
                    <option>₹25,000 - ₹50,000</option>
                    <option>₹50,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 text-primary" /> Message
                  </label>
                  <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient text-white py-5 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" /> Send Request
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-gray-soft border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">The Pixelrift Advantage</span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark">Why Businesses Choose Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center"
              >
                <div className="inline-flex p-4 bg-primary/5 rounded-xl mb-6">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-dark mb-3">{f.title}</h3>
                <p className="text-gray-text leading-relaxed text-sm font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Trust Marquee (Updated for Light Theme) */}
      <section className="py-16 border-t border-gray-100 bg-white">
        <div className="container mx-auto px-4 sm:px-6 overflow-hidden">
          <div className="flex items-center gap-20 whitespace-nowrap animate-[marquee_30s_linear_infinite] opacity-30 grayscale hover:grayscale-0 transition-all">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-dark uppercase tracking-widest italic">
                  Trusted by 500+ Businesses
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
