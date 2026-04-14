"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, ArrowLeft, Check, Zap, Star } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingModal = ({ isOpen, onClose, project, preSelectedPlan = 'BASIC' }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(preSelectedPlan);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    setLoading(true);
    try {
      const response = await axios.post('/api/book', {
        ...formData,
        projectName: project?.title || 'General Platform Inquiry',
        plan: plans[selectedPlan].name,
        price: plans[selectedPlan].price
      });
      if (response.data.success) {
        toast.success("Booking Request Sent Successfully!");
        onClose();
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error("Failed to send booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            className="glass p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] w-full max-w-4xl relative shrink-0 z-10 border-white/10 my-10"
          >
            <div className="mb-8 sm:mb-10 text-center">
               <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tighter uppercase italic">Secure Booking</h2>
               <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide px-4">
                 {project 
                   ? <>Customizing <span className="text-white font-bold">{project.title}</span> for your business</>
                   : <>Start your project journey with Pixelrift</>
                 }
               </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
              {/* Plan Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {Object.entries(plans).map(([key, plan]) => (
                  <div 
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-500 border-2 overflow-hidden ${
                      selectedPlan === key 
                      ? 'border-primary bg-primary/10 shadow-[0_0_50px_-10px_rgba(99,102,241,0.4)]' 
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    {key === 'PREMIUM' && (
                      <div className="absolute top-0 right-6 sm:right-8 bg-gradient px-3 sm:px-4 py-1.5 rounded-b-xl text-white text-[7px] sm:text-[8px] font-black uppercase tracking-widest z-20">
                         Best Value
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-xl transition-colors ${selectedPlan === key ? 'bg-primary text-white' : 'bg-white/10 text-slate-400'}`}>
                         {key === 'BASIC' ? <Zap className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                      </div>
                      {selectedPlan === key && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className="w-6 h-6 text-primary" />
                        </motion.div>
                      )}
                    </div>

                    <h4 className="text-white font-black text-base sm:text-lg mb-1 tracking-tight">{plan.name}</h4>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-2xl sm:text-3xl font-black text-white">₹{plan.price}</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 sm:mb-6">{plan.subtext}</p>
                    
                    <ul className="space-y-1.5 sm:space-y-2 mb-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-400 text-[10px] sm:text-[11px] font-medium">
                          <Check className="w-3 h-3 text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-white/5 border border-white/5 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white outline-none focus:border-primary/50 transition-all font-medium text-sm"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Business Email" 
                  className="w-full bg-white/5 border border-white/5 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-white outline-none focus:border-primary/50 transition-all font-medium text-sm"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <textarea 
                  placeholder="Tell us about your project requirements..." 
                  className="w-full h-32 md:col-span-2 bg-white/5 border border-white/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white outline-none focus:border-primary/50 transition-all resize-none font-medium text-sm"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <button 
                disabled={loading}
                className="w-full bg-gradient text-white py-4 sm:py-6 rounded-2xl sm:rounded-3xl font-black uppercase text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] flex items-center justify-center gap-4 hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" /> : <><Send className="w-4 h-4 sm:w-5 sm:h-5" /> Confirm Booking</>}
              </button>
            </form>

            <button 
              onClick={onClose}
              className="absolute top-6 sm:top-10 right-6 sm:right-10 text-slate-500 hover:text-white transition-colors"
              type="button"
            >
              <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 rotate-90" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
