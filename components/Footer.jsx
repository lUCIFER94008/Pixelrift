"use client";
import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="glass border-t-0 py-16 mt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <img
                src="https://res.cloudinary.com/dpmpefw2p/image/upload/v1/U2NyZWVuc2hvdF8yMDI2LTA0LTE1XzEyMTAyM195YXhtdDU.png"
                alt="Pixelrift Logo"
                className="h-8 w-auto object-contain rounded-lg"
                onError={(e) => e.target.style.display = "none"}
              />
              <span className="text-xl font-bold text-white uppercase tracking-wider">
                Pixel<span className="text-gradient">rift</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed mb-6">
              Premium ready-made web solutions for businesses that want to scale fast. 
              Modern design, full support, and instant deployment.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">Home</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-1">Projects</Link></li>
              <li><Link href="/branding" className="hover:text-primary transition-colors flex items-center gap-1">Branding</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors flex items-center gap-1">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-1">Support</a></li>
            </ul>
          </div>

          {/* Column 3: Work Done */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Work Done</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a 
                  href="https://bismi-iota.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all flex items-center gap-2 group border-b border-transparent hover:border-primary/30 w-fit"
                >
                  NEW BISMI GIFT HOUSE <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://vintage-vault-in.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-all flex items-center gap-2 group border-b border-transparent hover:border-primary/30 w-fit"
                >
                  Vintage Vault <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-3 text-slate-400 text-sm">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                GitHub
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                LinkedIn
              </a>
              <a href="mailto:hello@pixelrift.com" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> hello@pixelrift.com
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-medium">
          <p>© 2026 Pixelrift. All rights reserved.</p>
          <p>
            Designed by{' '}
            <a 
              href="https://r7-olive.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-primary transition-colors font-bold tracking-wider"
            >
              R7
            </a>
          </p>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-0"></div>
    </footer>
  );
};

export default Footer;
