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

  if (!project) return <div className="pt-40 text-center text-dark font-bold text-2xl">Project not found.</div>;

  return (
    <div className="py-24 md:py-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-dark mb-8 sm:mb-12 transition-colors group text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Assets
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-px-lg overflow-hidden mb-8 border border-gray-100 shadow-2xl relative group">
              <img src={project.image} alt={project.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              {project.isLive && (
                <div className="absolute top-6 left-6 bg-gradient px-4 py-2 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl">
                  <Sparkles className="w-3 h-3" /> Live Project
                </div>
              )}
            </div>
            
            <div className="lg:block">
              <div className="flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
                <Sparkles className="w-4 h-4" /> Comprehensive Solution
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-dark mb-6">
                {project.title}
              </h1>
              
              <p className="text-gray-text leading-relaxed text-lg mb-10 font-medium">
                {project.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 lg:mb-0">
                <div className="bg-white p-8 rounded-px-lg border border-gray-100 group hover:border-primary/30 shadow-sm transition-all">
                  <Globe className="text-primary w-6 h-6 mb-4" />
                  <h4 className="text-dark font-bold mb-2">Live Demo</h4>
                  <p className="text-gray-text text-sm leading-relaxed font-medium">Interactive staging environment ready for exploration.</p>
                </div>
                <div className="bg-white p-8 rounded-px-lg border border-gray-100 group hover:border-primary/30 shadow-sm transition-all">
                  <Cpu className="text-primary w-6 h-6 mb-4" />
                  <h4 className="text-dark font-bold mb-2">Build Quality</h4>
                  <p className="text-gray-text text-sm leading-relaxed font-medium">Enterprise-grade architecture with 99.9% uptime targets.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:sticky lg:top-40 h-fit"
          >
            <div className="bg-white p-8 md:p-10 rounded-px-lg border border-gray-100 shadow-2xl shadow-dark/5 relative overflow-hidden">
              <div className="mb-10 pb-10 border-b border-gray-100">
                <h3 className="text-dark font-bold mb-6 text-xs uppercase tracking-widest">Included Features</h3>
                <ul className="space-y-4">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-text text-sm font-medium">
                      <div className="bg-primary/10 p-1 rounded-full shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-12">
                <h3 className="text-dark font-bold mb-6 text-xs uppercase tracking-widest">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s, i) => (
                    <span key={i} className="bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-full text-xs font-bold text-gray-600">
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
                    className="w-full bg-gradient text-white py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:opacity-90 active:scale-[0.98] transition-all text-center flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                  >
                    View Live Project <Globe className="w-4 h-4" />
                  </a>
                ) : (
                  <button 
                    onClick={() => setShowBooking(true)}
                    className="w-full bg-gradient text-white py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-primary/20"
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
                  className={`w-full py-5 rounded-xl font-bold uppercase text-xs tracking-widest transition-all border ${
                    showCustomForm ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-gray-50 border-gray-200 text-dark hover:bg-gray-100'
                  } flex items-center justify-center gap-2`}
                >
                  <Palette className="w-4 h-4" />
                  {showCustomForm ? 'Hide Form' : 'Request Customization'}
                </button>
              </div>
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
            className="mt-16 max-w-3xl mx-auto"
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
