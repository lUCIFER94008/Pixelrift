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
    color: "slate"
  },
  {
    name: "Business",
    price: "12,999",
    tagline: "Most popular choice",
    icon: <Briefcase className="w-5 h-5" />,
    features: ["Multi-page Website", "Advanced Animations", "Contact Form + CRM", "Priority Support", "Email Marketing"],
    highlight: true,
    color: "primary"
  },
  {
    name: "Enterprise",
    price: "24,999",
    tagline: "Built for scale",
    icon: <Crown className="w-5 h-5" />,
    features: ["Custom Web App", "Database Integration", "User Auth System", "Admin Dashboard", "Lifetime Support"],
    highlight: false,
    color: "slate"
  }
];

const Pricing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className={`relative p-10 rounded-px-lg glass glossy transition-all duration-500 flex flex-col ${
            plan.highlight ? 'ring-2 ring-primary border-primary/50 shadow-2xl shadow-primary/20 scale-[1.05] z-10' : 'border-white/10 hover:border-white/20'
          }`}
        >
          {plan.highlight && (
            <div className="absolute top-0 right-10 bg-primary px-4 py-1.5 rounded-b-xl text-[8px] font-black uppercase tracking-widest text-white">
              Best Value
            </div>
          )}

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${
            plan.highlight ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'
          }`}>
            {plan.icon}
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">{plan.tagline}</p>

          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black text-white">₹{plan.price}</span>
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">/ Project</span>
          </div>

          <ul className="space-y-4 mb-12 flex-1">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-400 text-sm font-medium">
                <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-primary' : 'text-gray-600'}`} />
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            href="/projects" 
            className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              plan.highlight 
              ? 'bg-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90' 
              : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
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
