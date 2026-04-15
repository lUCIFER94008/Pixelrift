"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ArrowLeft, Check, Zap, Star, Phone } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, project, preSelectedPlan = 'BASIC' }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(preSelectedPlan);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    setSelectedPlan(preSelectedPlan);
  }, [preSelectedPlan, isOpen]);

  const plans = {
    BASIC: {
      name: 'BASIC PLAN',
      price: '9,999',
      subtext: '₹1,500/month maintenance',
      features: ['Full website project', 'Domain setup', 'Admin dashboard']
    },
    PREMIUM: {
      name: 'PREMIUM PLAN',
      price: '25,000',
      subtext: 'One-time payment',
      features: ['Full website project', '12 months maintenance', 'Priority support']
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, phone, message } = formData;
    
    // Validation
    if (!name || !email || !phone || !message) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      // 1. Record lead to backend (keeping for record purposes)
      await axios.post('/api/book', {
        name,
        email,
        phone,
        message,
        projectName: project?.title || 'General Platform Inquiry',
        plan: plans[selectedPlan].name,
        price: plans[selectedPlan].price
      });
      
      toast.success("Recording lead and opening WhatsApp...");
      
      // 2. Format WhatsApp Message
      const text = `Hello Pixelrift 👋

I’m interested in your website service.

Name: ${name}
Email: ${email}
Phone: ${phone}
Plan: ${plans[selectedPlan].name}
Message: ${message}`;

      const encodedText = encodeURIComponent(text);
      // Using number as requested
      const url = `https://wa.me/91XXXXXXXXXX?text=${encodedText}`;

      // 3. Open WhatsApp
      window.open(url, "_blank");
      
      // 4. Cleanup
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 1000);

    } catch (error) {
      console.error("Booking Error:", error);
      // Fallback: If backend fails, still allow WhatsApp redirect
      const text = `Hello Pixelrift 👋\n\nI’m interested in your website service.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlan: ${plans[selectedPlan].name}\nMessage: ${message}`;
      const url = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      toast.success("Proceeding via WhatsApp...");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.06] p-3.5 rounded-xl text-white outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] transition-all font-medium text-sm placeholder:text-slate-600";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/95 backdrop-blur-xl"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="glass p-5 sm:p-7 md:p-8 rounded-[1.75rem] sm:rounded-[2.5rem] w-full max-w-[900px] relative shrink-0 z-10 border-white/[0.08] my-6"
          >
            {/* Header — compact */}
            <div className="mb-6 sm:mb-7 text-center">
               <h2 className="text-2xl sm:text-3xl font-black text-white mb-1.5 sm:mb-2 tracking-tighter uppercase italic">Secure Booking</h2>
               <p className="text-slate-500 text-[11px] sm:text-xs font-medium tracking-wide px-4">
                 {project 
                   ? <>Customizing <span className="text-white font-bold">{project.title}</span> for your business</>
                   : <>Start your project journey with Pixelrift</>
                 }
               </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Plan Selection — compact cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(plans).map(([key, plan]) => (
                  <div 
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`relative p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-500 border overflow-hidden ${
                      selectedPlan === key 
                      ? 'border-primary bg-primary/10 shadow-[0_0_40px_-12px_rgba(99,102,241,0.35)]' 
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                    }`}
                  >
                    {key === 'PREMIUM' && (
                      <div className="absolute top-0 right-5 sm:right-6 bg-gradient px-2.5 sm:px-3 py-1 rounded-b-lg text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest z-20">
                         Best Value
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-3">
                      <div className={`p-1.5 rounded-lg transition-colors ${selectedPlan === key ? 'bg-primary text-white' : 'bg-white/10 text-slate-400'}`}>
                         {key === 'BASIC' ? <Zap className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                      </div>
                      {selectedPlan === key && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </div>

                    <h4 className="text-white font-black text-sm sm:text-base mb-0.5 tracking-tight">{plan.name}</h4>
                    <div className="flex items-baseline gap-1 mb-1.5">
                        <span className="text-xl sm:text-2xl font-black text-white">₹{plan.price}</span>
                    </div>
                    <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-3 sm:mb-4">{plan.subtext}</p>
                    
                    <ul className="space-y-1.5">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-400 text-[10px] sm:text-[11px] font-medium">
                          <Check className="w-3 h-3 text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* User Details — Name, Email, Phone, Message */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className={inputClass}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Business Email" 
                  className={inputClass}
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className={`${inputClass} md:col-span-2`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <textarea 
                  placeholder="Tell us about your project requirements..." 
                  className={`${inputClass} h-28 md:col-span-2 resize-none`}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                disabled={loading}
                className="w-full bg-gradient text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase text-[11px] sm:text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send className="w-4 h-4" /> Confirm Booking</>}
              </button>
            </form>

            <button 
              onClick={onClose}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-slate-500 hover:text-white transition-colors"
              type="button"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 rotate-90" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
