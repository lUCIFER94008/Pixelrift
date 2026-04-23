"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Crown, Zap, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: "Starter",
    price: "4,999",
    tagline: "Perfect for startups",
    icon: <Zap className="w-5 h-5" />,
    features: ["Custom Landing Page", "Mobile Responsive", "Basic SEO", "1 Month Support"],
    highlight: false,
  },
  {
    name: "Business",
    price: "12,999",
    tagline: "Most popular choice",
    icon: <Briefcase className="w-5 h-5" />,
    features: ["Multi-page Website", "Advanced Animations", "Contact Form + CRM", "Priority Support", "Email Marketing"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "24,999",
    tagline: "Built for scale",
    icon: <Crown className="w-5 h-5" />,
    features: ["Custom Web App", "Database Integration", "User Auth System", "Admin Dashboard", "Lifetime Support"],
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
          className={`relative p-10 rounded-px-lg transition-all duration-500 flex flex-col h-full ${
            plan.highlight 
            ? 'bg-hero-gradient shadow-2xl shadow-primary/10 scale-105 z-10 border border-primary/20' 
            : 'bg-white border border-gray-100 shadow-xl shadow-dark/5 hover:border-gray-200'
          }`}
        >
          {plan.highlight && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-4 py-1.5 rounded-b-xl text-[8px] font-black uppercase tracking-widest text-primary border border-t-0 border-primary/20 shadow-sm">
              Best Value
            </div>
          )}

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${
            plan.highlight ? 'bg-white text-primary shadow-sm' : 'bg-primary/10 text-primary'
          }`}>
            {plan.icon}
          </div>

          <h3 className="text-2xl font-black text-text-primary mb-2">{plan.name}</h3>
          <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mb-8">{plan.tagline}</p>

          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black text-text-primary">₹{plan.price}</span>
            <span className="text-text-secondary text-xs font-bold uppercase tracking-widest">/ Project</span>
          </div>

          <ul className="space-y-4 mb-12 flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-text-secondary text-sm font-bold">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-white' : 'text-primary'}`} />
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            href="/projects" 
            className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              plan.highlight 
              ? 'bg-white text-text-primary shadow-lg hover:bg-gray-50' 
              : 'btn-pastel shadow-lg shadow-primary/10'
            }`}
          >
            Choose Plan <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Pricing;
