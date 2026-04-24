"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="glass-card group h-full flex flex-col overflow-hidden border-white/5"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 border border-white/10 shadow-xl">
          <Sparkles className="w-3 h-3 text-primary" /> {project.category}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-black text-white mb-3 group-hover:text-accent-gradient transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 font-medium">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <Link 
            href={`/projects/${project.id}`}
            className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 hover:text-primary transition-all group/link"
          >
            Access Core <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          {project.isLive && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-primary transition-all border border-white/5"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
