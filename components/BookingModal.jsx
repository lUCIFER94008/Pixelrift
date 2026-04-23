"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, X, Check, Zap, Star, Phone, User, Mail, MessageSquare } from 'lucide-react';
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
      // 1. Record lead to backend
      await axios.post('/api/book', {
        name,
        email,
        phone,
        message,
        projectName: project?.title || 'General Platform Inquiry',
        plan: plans[selectedPlan].name,
        price: plans[selectedPlan].price
      });
      
      toast.success("Opening WhatsApp...");
      
      // 2. Format WhatsApp Message
      const text = `Hello Pixelrift 👋
      
I’m interested in your website service.

Name: ${name}
Email: ${email}
Phone: ${phone}
Plan: ${plans[selectedPlan].name}
Message: ${message}`;

      const encodedText = encodeURIComponent(text);
      const url = `https://wa.me/919400812373?text=${encodedText}`;

      // 3. Open WhatsApp
      window.open(url, "_blank");
      
      // 4. Cleanup
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 1000);

    } catch (error) {
      console.error("Booking Error:", error);
      const text = `Hello Pixelrift 👋\n\nI’m interested in your website service.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPlan: ${plans[selectedPlan].name}\nMessage: ${message}`;
      const url = `https://wa.me/919400812373?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      toast.success("Proceeding via WhatsApp...");
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "text-[10px] font-bold text-dark uppercase tracking-widest flex items-center gap-2 mb-2";
  const inputClass = "w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-dark outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm placeholder:text-gray-400";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/20 backdrop-blur-sm"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white p-6 md:p-10 rounded-px-lg w-full max-w-4xl relative z-10 border border-gray-100 shadow-2xl my-6"
          >
            {/* Header */}
            <div className="mb-8 text-center">
               <h2 className="text-3xl font-bold text-dark mb-2 tracking-tight uppercase">Secure Booking</h2>
               <p className="text-gray-text text-sm font-medium">
                 {project 
                   ? <>Customizing <span className="text-primary font-bold">{project.title}</span> for your business</>
                   : <>Start your project journey with Pixelrift</>
                 }
               </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Plan Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(plans).map(([key, plan]) => (
                  <div 
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`relative p-6 rounded-xl cursor-pointer transition-all border ${
                      selectedPlan === key 
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' 
                      : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {key === 'PREMIUM' && (
                      <div className="absolute top-0 right-6 bg-gradient px-3 py-1 rounded-b-lg text-white text-[8px] font-bold uppercase tracking-widest z-20">
                         Best Value
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-2 rounded-lg transition-colors ${selectedPlan === key ? 'bg-primary text-white' : 'bg-white text-gray-400 border border-gray-200'}`}>
                         {key === 'BASIC' ? <Zap className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                      </div>
                      {selectedPlan === key && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className="w-6 h-6 text-primary" />
                        </motion.div>
                      )}
                    </div>

                    <h4 className="text-dark font-bold text-lg mb-1 tracking-tight">{plan.name}</h4>
                    <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-2xl font-bold text-dark">₹{plan.price}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{plan.subtext}</p>
                    
                    <ul className="space-y-2">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-text text-xs font-medium">
                          <Check className="w-3 h-3 text-primary shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}><User className="w-3 h-3 text-primary" /> Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className={inputClass}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelClass}><Mail className="w-3 h-3 text-primary" /> Business Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className={inputClass}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className={labelClass}><Phone className="w-3 h-3 text-primary" /> Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 00000 00000" 
                    className={inputClass}
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className={labelClass}><MessageSquare className="w-3 h-3 text-primary" /> Message</label>
                  <textarea 
                    placeholder="Tell us about your project requirements..." 
                    className={`${inputClass} h-32 resize-none`}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <button 
                disabled={loading}
                className="w-full bg-gradient text-white py-5 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-primary/20"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send className="w-5 h-5" /> Confirm Booking</>}
              </button>
            </form>

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-dark transition-colors p-2 rounded-lg hover:bg-gray-100"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
