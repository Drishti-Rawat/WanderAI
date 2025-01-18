import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Settings, Sparkles } from 'lucide-react';
import TimelineStep from './TimeLineSteps';


const steps = [
  {
    icon: MapPin,
    number: '01',
    title: 'Choose Your Destination',
    description: 'Select where you want to go and for how long. Browse through our curated list of destinations.'
  },
  {
    icon: Settings,
    number: '02',
    title: 'Set Your Preferences',
    description: 'Tell us about your travel style, interests, and budget. Our AI will customize everything to your needs.'
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Get Your Plan',
    description: 'Receive an AI-crafted itinerary instantly, complete with accommodations and activities.'
  }
];

const HowItWorks = () => {
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your perfect trip in three simple steps
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;