"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="pastel-card group h-full flex flex-col overflow-hidden"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-text-primary uppercase tracking-widest flex items-center gap-2 border border-gray-100 shadow-sm">
          <Sparkles className="w-3 h-3 text-primary" /> {project.category}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl font-black text-text-primary mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1 font-bold">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <Link 
            href={`/projects/${project.id}`}
            className="text-xs font-black text-text-primary uppercase tracking-widest flex items-center gap-2 hover:text-primary transition-colors"
          >
            Project Details <ArrowRight className="w-3 h-3" />
          </Link>
          {project.isLive && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary hover:text-white transition-all shadow-sm shadow-primary/5"
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
