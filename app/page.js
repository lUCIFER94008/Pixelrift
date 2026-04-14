"use client";
import React from 'react';
import { ShieldCheck, Zap, DollarSign, Headset, ArrowRight, Sparkles } from 'lucide-react';
import Pricing from '@/components/Pricing';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const whyUs = [
    { icon: <ShieldCheck className="w-6 h-6 text-primary" />, title: "Custom Designs", desc: "Unique, tailor-made designs for your brand." },
    { icon: <Zap className="w-6 h-6 text-secondary" />, title: "Fast Delivery", desc: "Get your project live within days, not months." },
    { icon: <DollarSign className="w-6 h-6 text-accent" />, title: "Affordability", desc: "Premium solutions at highly competitive prices." },
    { icon: <Headset className="w-6 h-6 text-primary" />, title: "Full Support", desc: "We're here to help you every step of the way." },
  ];

  return (
    <div className="pb-16 sm:pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 glass rounded-full text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8">
              Revolutionizing Digital Presence
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 leading-[1.1] tracking-tighter">
              Build Your <br />
              <span className="text-gradient">Business Website</span> <br className="hidden sm:block" />
              Instantly
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-slate-400 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-medium px-4 sm:px-0">
              Premium ready-made web solutions with custom design and full support. 
              Skip the backlog and launch your business with a world-class digital product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-4 px-4 sm:px-0">
              <Link href="/projects" className="w-full sm:w-auto bg-gradient text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:opacity-95 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20">
                Explore Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects" className="w-full sm:w-auto glass text-white px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:bg-white/10 transition-all border border-white/10 text-center">
                Browse Solutions
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] sm:w-[1000px] h-[300px] sm:h-[600px] bg-primary/20 blur-[100px] sm:blur-[180px] rounded-full -z-10 opacity-60"></div>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[400px] sm:w-[800px] h-[200px] sm:h-[400px] bg-secondary/10 blur-[80px] sm:blur-[150px] rounded-full -z-10 opacity-40"></div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col items-center mb-16 sm:mb-24 text-center">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
             >
               <span className="text-primary font-black text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 block">The Pixelrift Advantage</span>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white px-4">Why Businesses Choose Us</h2>
             </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
            {whyUs.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 sm:p-10 rounded-2xl sm:rounded-3xl text-center glass-hover border-white/5 relative group"
              >
                <div className="inline-flex p-3 sm:p-4 bg-primary/10 rounded-xl sm:rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {f.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed px-2 sm:px-0">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      {/* Trust Banner / Marquee */}
      <section className="py-12 sm:py-16 border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4 sm:px-6 overflow-hidden">
          <div className="flex items-center gap-12 sm:gap-20 whitespace-nowrap animate-[marquee_30s_linear_infinite] opacity-50 grayscale hover:grayscale-0 transition-all">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-6">
                <Sparkles className="w-5 h-5 text-primary/30" />
                <span className="text-xl sm:text-3xl font-black text-white/20 uppercase tracking-widest italic">
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
