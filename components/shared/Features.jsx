import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Hotel, Navigation } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'AI-powered daily itineraries that maximize your time and experiences',
    detail: 'Our AI analyzes thousands of travel patterns to create the perfect schedule that matches your interests and pace.'
  },
  {
    icon: Hotel,
    title: 'Hotel Matching',
    description: 'Personalized accommodation recommendations within your budget',
    detail: 'Get matched with hotels that perfectly fit your style, location preferences, and budget constraints.'
  },
  {
    icon: Navigation,
    title: 'Route Optimization',
    description: 'Efficient travel routes to make the most of each day',
    detail: 'Smart algorithms plan your routes to minimize travel time and maximize sightseeing opportunities.'
  },
  {
    icon: Clock,
    title: 'Timeline Planning',
    description: 'Detailed hourly schedules that keep you on track',
    detail: 'Stay organized with precise timelines that account for opening hours, travel times, and your preferred pace.'
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="group relative"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative z-10 bg-white rounded-xl p-6 shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="mb-4"
            >
              <feature.icon className="h-10 w-10 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{feature.title}</h4>
          <p className="text-sm text-gray-600">{feature.detail}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Features = () => {
  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Plan Smarter, Travel Better
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI understands your preferences to create the perfect travel experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;