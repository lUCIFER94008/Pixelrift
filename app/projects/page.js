"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';

const projectsData = [
  {
    id: 101,
    title: "NEW BISMI GIFT HOUSE",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    description: "Modern gift store website with product showcase and smooth UI. Optimized for mobile shoppers and high conversion.",
    isLive: true,
    liveUrl: "https://bismi-iota.vercel.app/"
  },
  {
    id: 102,
    title: "VINTAGE VAULT",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    description: "Stylish vintage clothing store with premium branding and UI. Features a clean catalog and seamless user experience.",
    isLive: true,
    liveUrl: "https://vintage-vault-in.vercel.app/"
  },
  {
    id: 1,
    title: "EcoShop - Modern E-commerce",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    description: "Full-featured e-commerce solution with cart, payment integration, and admin dashboard.",
  },
  {
    id: 2,
    title: "StayEase - Booking System",
    category: "Booking",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    description: "Real-time booking and reservation system for hotels, clinics, or consultants.",
  },
  {
    id: 3,
    title: "DevFolio - Portfolio Template",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-fast, SEO-optimized portfolio for developers and creative professionals.",
  },
  {
    id: 4,
    title: "MediConnect - Healthcare Portal",
    category: "Booking",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    description: "Complete healthcare management with doctor scheduling and patient records.",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'E-commerce', 'Booking', 'Portfolio'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="py-16 md:py-24 min-h-screen relative overflow-hidden">
      <div>
        <header className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10 border-b border-white/5 pb-8 sm:pb-12">
          <div className="max-w-xl text-center lg:text-left">
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
             >
                <div className="flex items-center justify-center lg:justify-start gap-3 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4">
                  <Sparkles className="w-4 h-4" /> Proven Excellence
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
                   Project Catalog
                </h1>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Premium ready-made web solutions designed to help your business scale instantly. 
                  Now featuring our recently launched <span className="text-white font-bold">Live Projects</span>.
                </p>
             </motion.div>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all uppercase tracking-widest ${
                  filter === cat 
                  ? 'bg-gradient text-white shadow-lg' 
                  : 'text-slate-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.main 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.main>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/10 blur-[80px] sm:blur-[150px] -z-10 rounded-full opacity-50"></div>
    </div>
  );
}
