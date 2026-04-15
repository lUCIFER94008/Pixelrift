"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, Sparkles, User, Mail, Phone, DollarSign, MessageSquare } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CustomizationForm = ({ projectName }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await axios.post('/api/book', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        message: formData.message,
        projectName: projectName || 'Custom Project',
        plan: 'Customization Request',
        price: 'Custom'
      });

      if (resp.data.success) {
        setSubmitted(true);
        toast.success('Request sent successfully!');
        setFormData({ name: '', email: '', phone: '', budget: '', message: '' });

        // Open WhatsApp in a new tab
        setTimeout(() => {
          if (resp.data.whatsappUrl) {
            window.open(resp.data.whatsappUrl, '_blank');
          }
        }, 1200);
      }
    } catch (error) {
      toast.error('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="customization-card"
      >
        <div className="text-center py-8 sm:py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 mb-6"
          >
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
          </motion.div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">Request Sent Successfully!</h3>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
            We&apos;ve received your customization request. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Submit Another Request →
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="customization-card"
    >
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-4 h-4" /> Custom Build
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tighter mb-2">
          Tell us your idea — we&apos;ll build it for you
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-lg mx-auto">
          Share your project vision and requirements. We&apos;ll craft a tailored solution just for you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" id="customization-form">
        {/* Name & Email — Row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="customization-input-group">
            <User className="customization-input-icon" />
            <input
              id="custom-name"
              type="text"
              name="name"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={handleChange}
              className="customization-input"
            />
          </div>
          <div className="customization-input-group">
            <Mail className="customization-input-icon" />
            <input
              id="custom-email"
              type="email"
              name="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={handleChange}
              className="customization-input"
            />
          </div>
        </div>

        {/* Phone & Budget — Row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="customization-input-group">
            <Phone className="customization-input-icon" />
            <input
              id="custom-phone"
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              value={formData.phone}
              onChange={handleChange}
              className="customization-input"
            />
          </div>
          <div className="customization-input-group">
            <DollarSign className="customization-input-icon" />
            <input
              id="custom-budget"
              type="text"
              name="budget"
              placeholder="Budget Range (optional)"
              value={formData.budget}
              onChange={handleChange}
              className="customization-input"
            />
          </div>
        </div>

        {/* Message */}
        <div className="customization-input-group customization-textarea-group">
          <MessageSquare className="customization-input-icon customization-textarea-icon" />
          <textarea
            id="custom-message"
            name="message"
            placeholder="Describe your project requirements... *"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="customization-input customization-textarea"
          />
        </div>

        {/* Submit Button */}
        <button
          id="custom-submit-btn"
          type="submit"
          disabled={loading}
          className="customization-submit-btn"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Sending Request...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Send Customization Request</span>
            </>
          )}
        </button>
      </form>

      {/* Decorative Blurs */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-secondary/10 blur-[80px] -z-10 rounded-full pointer-events-none"></div>
    </motion.div>
  );
};

export default CustomizationForm;
