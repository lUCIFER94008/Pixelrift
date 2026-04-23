"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Home, LayoutGrid, Zap, Palette, Tag } from 'lucide-react';
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
    { name: 'Pricing', href: '#pricing', icon: <Tag className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'py-6 bg-white border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex justify-between items-center w-full">
          <Link href="/" className="z-[70]">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Pixelrift Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />

              <span className="text-dark font-bold text-lg">
                Pixel<span className="text-primary">rift</span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-gray-500 hover:text-dark text-sm font-semibold transition-all hover:translate-y-[-1px] active:translate-y-0"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Link 
              href="/projects" 
              className="bg-gradient text-white px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Building
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[70] p-2 text-dark bg-gray-50 rounded-xl border border-gray-100" 
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
              className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-[55] md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-gray-100 z-[60] md:hidden p-8 pt-32 flex flex-col gap-8 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Navigation</span>
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-xl font-bold text-dark hover:text-primary transition-colors p-4 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100"
                  >
                    <div className="p-2 bg-gray-100 rounded-xl text-gray-500">{link.icon}</div>
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto space-y-6">
                <div className="p-6 rounded-3xl border border-primary/10 bg-primary/5">
                   <div className="flex items-center gap-2 text-primary font-bold uppercase text-[10px] tracking-widest mb-2">
                     <Zap className="w-3 h-3" /> Get Started Now
                   </div>
                   <p className="text-gray-500 text-xs mb-6 leading-relaxed">Ready to launch your enterprise-grade digital product?</p>
                   <Link 
                      href="/projects" 
                      onClick={() => setIsOpen(false)}
                      className="w-full justify-center bg-gradient text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20"
                   >
                     Explore Assets <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>
                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2026 Pixelrift. By R7</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
