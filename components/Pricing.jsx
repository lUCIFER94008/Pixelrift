"use client";
import React, { useState } from 'react';
import { Check, Star, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingModal from './BookingModal';

const PricingCard = ({ title, price, subtext, features, isHighValue, note, onSelect }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`bg-white p-8 sm:p-10 rounded-px-lg flex flex-col relative transition-all duration-300 overflow-hidden border h-full ${
        isHighValue 
        ? 'pricing-card-highlight shadow-2xl shadow-primary/10' 
        : 'border-gray-100 shadow-sm'
      }`}
    >
      {isHighValue && (
        <div className="absolute top-0 right-10 bg-gradient px-6 py-2 rounded-b-2xl text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 z-20">
          <Star className="w-3 h-3 fill-white" /> Best Value
        </div>
      )}
      
      <div className="mb-8 text-center md:text-left">
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 ${isHighValue ? 'text-primary' : 'text-gray-400'}`}>
          {title}
        </h3>
        <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
          <span className="text-5xl font-bold text-dark tracking-tighter">₹{price}</span>
        </div>
        {subtext && (
          <p className="text-gray-text font-bold text-xs uppercase tracking-widest">{subtext}</p>
        )}
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4 text-gray-text text-sm text-left">
            <div className={`mt-1 p-1 rounded-full flex-shrink-0 ${isHighValue ? 'bg-primary/10' : 'bg-gray-100'}`}>
              <Check className={`w-3 h-3 stroke-[3px] ${isHighValue ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <span className="leading-snug font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button 
          onClick={onSelect}
          className={`w-full py-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-3 ${
            isHighValue 
            ? 'bg-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90' 
            : 'bg-gray-50 text-dark hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {isHighValue ? <><Star className="w-4 h-4" /> Choose Premium</> : <><Zap className="w-4 h-4" /> Get Started</>}
        </button>
        {note && (
          <p className="text-center mt-6 text-[10px] font-bold text-primary uppercase tracking-widest">
            {note}
          </p>
        )}
      </div>
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
      note: "Most businesses choose Premium"
    }
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-gray-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              <Sparkles className="inline-block w-4 h-4 mr-2 mb-1" /> Transparent Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">
              Simple Pricing for <span className="text-gradient">Every Business</span>
            </h2>
            <p className="text-gray-text leading-relaxed max-w-2xl mx-auto text-lg font-medium">
              Choose a plan that fits your needs. Transparent pricing, no hidden costs.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto relative z-10">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full md:w-1/2"
            >
              <PricingCard 
                {...plan} 
                onSelect={() => setModalState({ isOpen: true, plan: plan.id })}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })} 
        preSelectedPlan={modalState.plan} 
      />
    </section>
  );
};

export default Pricing;
