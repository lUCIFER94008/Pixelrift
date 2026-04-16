"use client";
import React, { useState } from 'react';
import { Check, Star, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';

const PricingCard = ({ title, price, subtext, features, isHighValue, note, onSelect }) => {
  return (
    <motion.div 
      whileHover={{ y: -15, scale: isHighValue ? 1.05 : 1.02 }}
      className={`glass p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col relative transition-all duration-500 overflow-hidden border-2 h-full ${
        isHighValue 
        ? 'border-primary/50 shadow-[0_30px_100px_-20px_rgba(99,102,241,0.4)] bg-gradient-to-b from-primary/10 to-transparent lg:scale-105 z-10' 
        : 'border-white/5 hover:border-white/20'
      }`}
    >
      {isHighValue && (
        <div className="absolute top-0 right-10 sm:right-12 bg-gradient px-6 sm:px-8 py-2 rounded-b-2xl sm:rounded-b-3xl text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl z-20">
          <Star className="w-3 h-3 fill-white" /> Best Value
        </div>
      )}
      
      <div className="mb-8 sm:mb-10 text-center md:text-left">
        <h3 className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4 ${isHighValue ? 'text-primary' : 'text-slate-500'}`}>
          {title}
        </h3>
        <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
          <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">₹{price}</span>
        </div>
        {subtext && (
          <p className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest">{subtext}</p>
        )}
      </div>

      <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4 text-slate-400 text-xs sm:text-sm text-left">
            <div className={`mt-1 p-1 rounded-full flex-shrink-0 ${isHighValue ? 'bg-primary/20' : 'bg-white/5'}`}>
              <Check className={`w-3 h-3 stroke-[4px] ${isHighValue ? 'text-primary' : 'text-slate-400'}`} />
            </div>
            <span className="leading-snug font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button 
          onClick={onSelect}
          className={`w-full py-4 sm:py-5 rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
            isHighValue 
            ? 'bg-gradient text-white shadow-[0_20px_50px_-10px_rgba(99,102,241,0.5)] hover:opacity-90 active:scale-[0.98]' 
            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
          }`}
        >
          {isHighValue ? <><Star className="w-4 h-4" /> Choose Premium</> : <><Zap className="w-4 h-4" /> Get Started</>}
        </button>
        {note && (
          <p className="text-center mt-6 text-[9px] sm:text-[10px] font-bold text-primary/60 uppercase tracking-widest animate-pulse">
            {note}
          </p>
        )}
      </div>

      {isHighValue && (
        <>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[80px] rounded-full -z-10"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 blur-[80px] rounded-full -z-10"></div>
        </>
      )}
    </motion.div>
  );
};

const Pricing = () => {
  const [modalState, setModalState] = useState({ isOpen: false, plan: 'BASIC' });

  const plans = [
    {
      id: 'BASIC',
      title: "BASIC PLAN",
      price: "9,999",
      subtext: "₹1,500/month maintenance",
      features: [
        "Full website project",
        "Domain setup assist",
        "Admin dashboard",
        "Standard user modules",
        "Custom premium design",
        "Monthly support & updates"
      ],
      isHighValue: false,
    },
    {
      id: 'PREMIUM',
      title: "PREMIUM PLAN",
      price: "25,000",
      subtext: "One-time payment",
      features: [
        "Everything in Basic Plan",
        "12 months maintenance included",
        "Priority 24/7 technical support",
        "Unlimited free upgrades",
        "Advanced SEO optimization",
        "Enterprise performance tuning"
      ],
      isHighValue: true,
      note: "Most businesses choose Premium for long-term savings"
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 relative overflow-hidden">
      <div className="text-center mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-black text-xs uppercase tracking-[0.3em] mb-4 block">
            <Sparkles className="inline-block w-4 h-4 mr-2 mb-1" /> Transparent Pricing
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
            Simple Pricing for <span className="text-gradient">Every Business</span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto text-lg">
            Choose a plan that fits your needs. Transparent pricing, no hidden costs.
          </p>
        </motion.div>
      </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 sm:gap-12 lg:gap-8 max-w-5xl mx-auto relative z-10 px-2 sm:px-0">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="w-full md:w-1/2"
            >
              <PricingCard 
                {...plan} 
                onSelect={() => setModalState({ isOpen: true, plan: plan.id })}
              />
            </motion.div>
          ))}
        </div>

      <BookingModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
        preSelectedPlan={modalState.plan} 
      />

      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1200px] h-[600px] sm:h-[1200px] bg-primary/5 blur-[100px] sm:blur-[200px] rounded-full -z-10 opacity-60"></div>
    </section>
  );
};

export default Pricing;
