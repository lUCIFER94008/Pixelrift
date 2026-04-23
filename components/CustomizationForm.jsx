"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, Sparkles, User, Mail, Phone, IndianRupee, MessageSquare } from 'lucide-react';
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
        className="bg-white p-8 md:p-12 rounded-px-lg border border-gray-100 shadow-2xl shadow-dark/5"
      >
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </motion.div>
          <h3 className="text-2xl font-bold text-dark mb-3 tracking-tight">Request Sent Successfully!</h3>
          <p className="text-gray-text text-sm mb-8 max-w-md mx-auto font-medium">
            We&apos;ve received your customization request. Our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 md:p-12 rounded-px-lg border border-gray-100 shadow-2xl shadow-dark/5"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-4 h-4" /> Custom Build
        </div>
        <h3 className="text-3xl font-bold text-dark tracking-tight mb-2">
          Tell us your idea — we&apos;ll build it
        </h3>
        <p className="text-gray-text text-sm font-medium max-w-lg mx-auto">
          Share your project vision and requirements. We&apos;ll craft a tailored solution just for you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3 text-primary" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe *"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
              <Mail className="w-3 h-3 text-primary" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com *"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
              <Phone className="w-3 h-3 text-primary" /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 00000 00000"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
              <IndianRupee className="w-3 h-3 text-primary" /> Budget Range
            </label>
            <input
              type="text"
              name="budget"
              placeholder="e.g. ₹25,000"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-dark uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="w-3 h-3 text-primary" /> Project Requirements
          </label>
          <textarea
            name="message"
            placeholder="Describe your project vision and specific features you need... *"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient text-white py-5 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Customization Request</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CustomizationForm;
