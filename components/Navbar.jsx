"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Home, LayoutGrid, Zap, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Projects', href: '/projects', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'Branding', href: '/branding', icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled ? 'py-4 bg-dark/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group relative z-[70]">
            <img
              src="/logo.png"
              alt="Pixelrift Logo"
              className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
              style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))" }}
            />
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter">
              Pixel<span className="text-primary">rift</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-slate-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-1px] active:translate-y-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link 
              href="/projects" 
              className="bg-gradient text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:opacity-90 transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Building
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[70] p-2 text-white glass rounded-xl border-white/10" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark/95 backdrop-blur-2xl z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-dark border-l border-white/5 z-[60] md:hidden p-8 pt-32 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-2 px-2">Navigation</span>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-2xl font-black text-white hover:text-primary transition-colors glass p-4 rounded-2xl border-white/5"
                  >
                    <div className="p-2 bg-white/5 rounded-xl">{link.icon}</div>
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <div className="glass p-6 rounded-3xl border-primary/20 bg-primary/5">
                   <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest mb-2">
                     <Zap className="w-3 h-3" /> Get Started Now
                   </div>
                   <p className="text-slate-400 text-xs mb-6 leading-relaxed">Ready to launch your enterprise-grade digital product?</p>
                   <Link 
                      href="/projects" 
                      onClick={() => setIsOpen(false)}
                      className="w-full justify-center bg-gradient text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2"
                   >
                     Explore Assets <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
                <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">© 2026 Pixelrift. By R7</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
