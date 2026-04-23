"use client";
import React from 'react';
import { ExternalLink, Tag, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ProjectCard = ({ project }) => {
  const isLive = project.isLive;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`bg-white rounded-px-lg overflow-hidden group border border-gray-100 transition-all duration-300 hover:shadow-xl ${isLive ? 'border-primary/20' : ''}`}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isLive && (
            <div className="bg-gradient text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary/20">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-200 shadow-sm">
          <Tag className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-bold text-dark uppercase tracking-wider">{project.category}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-2">{project.title}</h3>
          <p className="text-gray-text leading-relaxed text-sm font-medium">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          {isLive ? (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-white bg-primary hover:bg-primary-hover px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-primary/20 group/btn"
            >
              <span className="text-xs font-bold uppercase tracking-widest">View Live</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <Link 
              href={`/projects/${project.id}`}
              className="w-full flex items-center justify-center gap-2 text-dark bg-gray-50 hover:bg-gray-100 px-6 py-3.5 rounded-xl transition-all border border-gray-200 group/btn"
            >
              <span className="text-xs font-bold uppercase tracking-widest">View Details</span>
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

export default ProjectCard;
