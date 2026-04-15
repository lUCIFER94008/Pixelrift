"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, Globe, Cpu, ArrowLeft, Sparkles, Palette } from 'lucide-react';
import Link from 'next/link';
import BookingModal from '@/components/BookingModal';
import CustomizationForm from '@/components/CustomizationForm';

const projectsData = [
  {
    id: 101,
    title: "NEW BISMI GIFT HOUSE",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    description: "Modern gift store website with product showcase and smooth UI. Optimized for mobile shoppers and high conversion.",
    features: ["Product Showcase", "Modern UI/UX", "Mobile Optimization", "Secure Contact Form", "Fast Loading"],
    stack: ["React", "Tailwind CSS", "Vercel", "Lucide Icons"],
    isLive: true,
    liveUrl: "https://bismi-iota.vercel.app/"
  },
  {
    id: 102,
    title: "VINTAGE VAULT",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    description: "Stylish vintage clothing store with premium branding and UI. Features a clean catalog and seamless user experience.",
    features: ["Premium Branding", "Clean Catalog", "Smooth Transitions", "Responsive Design", "Custom CMS"],
    stack: ["React", "Framer Motion", "MongoDB", "Cloudinary"],
    isLive: true,
    liveUrl: "https://vintage-vault-in.vercel.app/"
  },
  {
    id: 1,
    title: "EcoShop - Modern E-commerce",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    description: "Full-featured e-commerce solution with cart, payment integration, and admin dashboard. Built for scale and speed.",
    features: ["Product Management", "Shopping Cart", "Payment Gateway Integration", "User Authentication", "Admin Panel"],
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "StayEase - Booking System",
    category: "Booking",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Real-time booking and reservation system for hotels, clinics, or consultants. seamless experience for your clients.",
    features: ["Availability Calendar", "Online Appointments", "Email Confirmations", "Customer Database", "Service Management"],
    stack: ["React", "Express", "MongoDB", "Framer Motion"],
  },
  {
    id: 3,
    title: "DevFolio - Portfolio Template",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-fast, SEO-optimized portfolio for developers and creative professionals. Showcase your work in style.",
    features: ["Responsive Design", "Project Gallery", "Contact Form", "SEO Meta Tags", "Dark Mode Support"],
    stack: ["React", "Vite", "CSS Modules", "Lucide Icons"],
  },
  {
    id: 4,
    title: "MediConnect - Healthcare Portal",
    category: "Booking",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    description: "Complete healthcare management with doctor scheduling and patient records.",
    features: ["Patient Records", "Doctor Scheduling", "Department Management", "Billing System", "Secure Portal"],
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
  },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const customFormRef = useRef(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  if (!project) return <div className="pt-40 text-center text-white font-black text-2xl">Project not found.</div>;

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 sm:mb-12 transition-colors group text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Assets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Left: Content (Image stays on top on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="glass rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden mb-8 sm:mb-12 border-white/5 shadow-2xl relative group">
              <img src={project.image} alt={project.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              {project.isLive && (
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-gradient px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                  <Sparkles className="w-3 h-3" /> Live Project
                </div>
              )}
            </div>
            
            <div className="lg:block">
              <div className="flex items-center gap-3 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4">
                <Sparkles className="w-4 h-4" /> Comprehensive Solution
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-tight">{project.title}</h1>
              <p className="text-slate-400 text-sm sm:text-lg leading-relaxed mb-8 sm:mb-10 font-medium">
                {project.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 lg:mb-0">
                <div className="glass p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-white/5 group hover:border-primary/30 transition-all">
                  <Globe className="text-primary w-5 h-5 sm:w-6 sm:h-6 mb-4" />
                  <h4 className="text-white font-bold mb-2 text-sm sm:text-base">Live Demo</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Interactive staging environment ready for exploration.</p>
                </div>
                <div className="glass p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-white/5 group hover:border-secondary/30 transition-all">
                  <Cpu className="text-secondary w-5 h-5 sm:w-6 sm:h-6 mb-4" />
                  <h4 className="text-white font-bold mb-2 text-sm sm:text-base">Build Quality</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Enterprise-grade architecture with 99.9% uptime targets.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-40 h-fit"
          >
            <div className="glass p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-white/10 relative overflow-hidden">
              <div className="mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-white/5">
                <h3 className="text-white font-bold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest">Included Features</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 sm:gap-4 text-slate-400 text-xs sm:text-sm">
                      <div className="bg-primary/20 p-1 rounded-full shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10 sm:mb-12">
                <h3 className="text-white font-bold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {project.isLive ? (
                  <a 
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all text-center flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                  >
                    View Live Project <Globe className="w-4 h-4" />
                  </a>
                ) : (
                  <button 
                    onClick={() => setShowBooking(true)}
                    className="w-full bg-gradient text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
                  >
                    Start Building Now
                  </button>
                )}
                <button 
                  onClick={() => {
                    setShowCustomForm(!showCustomForm);
                    if (!showCustomForm) {
                      setTimeout(() => {
                        customFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }
                  }}
                  className={`w-full glass py-4 sm:py-5 rounded-xl sm:rounded-2xl text-white font-bold uppercase text-[10px] sm:text-xs tracking-[0.1em] hover:bg-white/10 transition-all border ${
                    showCustomForm ? 'border-primary/40 bg-primary/10' : 'border-white/5'
                  } flex items-center justify-center gap-2`}
                >
                  <Palette className="w-4 h-4" />
                  {showCustomForm ? 'Hide Form' : 'Request Customization'}
                </button>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl -z-10 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Customization Form Section */}
        {showCustomForm && (
          <motion.div
            ref={customFormRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16 max-w-3xl mx-auto"
          >
            <CustomizationForm projectName={project.title} />
          </motion.div>
        )}
      </div>

      <BookingModal 
        isOpen={showBooking} 
        onClose={() => setShowBooking(false)} 
        project={project} 
      />
    </div>
  );
}
