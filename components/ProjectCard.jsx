"use client";
import React from 'react';
import { ExternalLink, Tag, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  const isLive = project.isLive;

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className={`glass rounded-[2rem] overflow-hidden group border border-white/5 transition-all duration-500 hover:shadow-xl ${isLive ? 'border-primary/20' : ''}`}
    >
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 flex gap-2">
          {isLive && (
            <div className="bg-gradient-to-r from-primary to-secondary px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 shadow-2xl animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Project</span>
            </div>
          )}
        </div>

        <div className="absolute top-4 sm:top-5 right-4 sm:right-5 bg-slate-900/80 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 shadow-xl">
          <Tag className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">{project.category}</span>
        </div>
      </div>
      
      <div className="p-6 sm:p-10 text-center">
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">{project.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          {isLive ? (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-white bg-primary/20 hover:bg-primary/40 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all border border-primary/20 group/btn shadow-lg hover:shadow-primary/20"
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">View Live</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <Link 
              href={`/projects/${project.id}`}
              className="w-full flex items-center justify-center gap-2 text-white bg-white/5 hover:bg-white/10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all border border-white/10 group/btn hover:shadow-xl"
            >
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">View Details</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
