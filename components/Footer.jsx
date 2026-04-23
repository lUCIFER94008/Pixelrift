"use client";
import React from 'react';
import { Mail, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img
                src="/logo.png"
                alt="Pixelrift Logo"
                className="h-8 w-auto"
              />
              <span className="text-text-primary font-black text-xl tracking-tight">
                Pixel<span className="text-primary">rift</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium">
              We specialize in creating premium digital assets, from high-converting websites to complete brand identities. Ready to scale?
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="text-text-primary font-black mb-6 text-xs uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-4 text-text-secondary text-sm font-bold">
              <li><Link href="/projects" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link href="/branding" className="hover:text-primary transition-colors">Brand Identity</Link></li>
              <li><Link href="/branding#services" className="hover:text-primary transition-colors">UI/UX Design</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Project Catalog</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-text-primary font-black mb-6 text-xs uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-text-secondary text-sm font-bold">
              <li><Link href="/" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-text-primary font-black mb-6 text-xs uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-3 text-text-secondary text-sm font-bold">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> GitHub
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> LinkedIn
              </a>
              <a href="mailto:contact@pixelrift.in" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> contact@pixelrift.in
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
          <p>© 2026 Pixelrift Digital Agency. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
