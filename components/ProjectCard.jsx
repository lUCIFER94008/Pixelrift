"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass glass-hover rounded-px-lg group h-full flex flex-col glossy"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-primary" /> {project.category}
        </div>

        {/* Action Button */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <Link 
            href={project.liveUrl || `/projects/${project.id}`}
            className="bg-primary p-3 rounded-xl text-white shadow-xl shadow-primary/20"
           >
              <ExternalLink className="w-5 h-5" />
           </Link>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 font-medium">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link 
            href={`/projects/${project.id}`}
            className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
          >
            Project Details <ArrowRight className="w-3 h-3" />
          </Link>
          {project.isLive && (
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Now
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
