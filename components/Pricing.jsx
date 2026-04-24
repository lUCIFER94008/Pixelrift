"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown, Zap, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: "Starter",
    price: "4,999",
    tagline: "Essential Presence",
    icon: <Zap className="w-5 h-5" />,
    features: ["Custom Landing Page", "Mobile Responsive", "Basic SEO", "1 Month Support"],
    highlight: false,
  },
  {
    name: "Business",
    price: "12,999",
    tagline: "Market Dominance",
    icon: <Briefcase className="w-5 h-5" />,
    features: ["Multi-page Platform", "Advanced Animations", "Contact Form + CRM", "Priority Support", "AI Integration"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "24,999",
    tagline: "Infinite Scale",
    icon: <Crown className="w-5 h-5" />,
    features: ["Custom Web App", "Database Architecture", "User Auth System", "Admin Control Panel", "24/7 Priority Support"],
    highlight: false,
  }
];

const Pricing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
      {plans.map((plan, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={`relative p-10 glass-card flex flex-col h-full ${
            plan.highlight 
            ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10 bg-white/[0.05]' 
            : 'border-white/10 hover:border-white/20'
          }`}
        >
          {plan.highlight && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded-b-xl text-[8px] font-black uppercase tracking-widest text-white shadow-lg">
              Most Advanced
            </div>
          )}

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${
            plan.highlight ? 'bg-primary text-white shadow-xl shadow-primary/40' : 'bg-primary/10 text-primary'
          }`}>
            {plan.icon}
          </div>

          <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-8 opacity-80">{plan.tagline}</p>

          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black text-white">₹{plan.price}</span>
            <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest ml-2">/ Launch</span>
          </div>

          <ul className="space-y-4 mb-12 flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-primary' : 'text-primary/60'}`} />
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            href="/projects" 
            className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              plan.highlight 
              ? 'btn-glow shadow-xl shadow-primary/20' 
              : 'btn-outline-dark'
            }`}
          >
            Deploy Plan <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Pricing;
