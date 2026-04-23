"use client";
import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-soft border-t border-gray-100 py-16 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Pixelrift Logo"
                className="h-8 w-auto object-contain"
              />

              <span className="text-dark font-bold text-lg">
                Pixel<span className="text-primary">rift</span>
              </span>
            </div>
            <p className="text-gray-text max-w-sm text-sm leading-relaxed mb-6 font-medium">
              Premium ready-made web solutions for businesses that want to scale fast.
              Modern design, full support, and instant deployment.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-dark font-bold mb-6 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-gray-text text-sm font-medium">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">Home</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors flex items-center gap-1">Projects</Link></li>
              <li><Link href="/branding" className="hover:text-primary transition-colors flex items-center gap-1">Branding</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors flex items-center gap-1">Pricing</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-1">Support</a></li>
            </ul>
          </div>

          {/* Column 3: Work Done */}
          <div>
            <h4 className="text-dark font-bold mb-6 text-xs uppercase tracking-widest">Work Done</h4>
            <ul className="space-y-3 text-gray-text text-sm font-medium">
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
            <h4 className="text-dark font-bold mb-6 text-xs uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-3 text-gray-text text-sm font-medium">
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> GitHub
              </a>
              <a href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" /> LinkedIn
              </a>
              <a href="mailto:mohammedrizwan9c@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> mohammedrizwan9c@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 Pixelrift. All rights reserved.</p>
          <p>
            Designed by{' '}
            <a
              href="https://r7-olive.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              R7
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
