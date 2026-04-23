"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Branding', href: '/branding' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Pixelrift Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
              <span className="text-text-primary font-black text-xl tracking-tight">
                Pixel<span className="text-primary">rift</span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-text-secondary hover:text-text-primary text-sm font-bold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/projects" 
              className="btn-pastel px-8 py-3 rounded-full shadow-lg shadow-primary/10"
            >
              Start Building <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-text-primary" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black text-text-primary hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/projects" 
                onClick={() => setIsOpen(false)}
                className="btn-pastel py-4 text-lg justify-center mt-4"
              >
                Start Building
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
