import React from 'react';
import { motion } from 'framer-motion';



const TimelineStep = ({ step, index, isLast }) => {
  const Icon = step.icon;
  
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="flex items-start space-x-6"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>
        
        <div className="pt-3">
          <div className="flex items-center space-x-2 mb-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {step.number}
            </motion.span>
            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.4 }}
            className="text-lg text-gray-600"
          >
            {step.description}
          </motion.p>
        </div>
      </motion.div>

      {!isLast && (
        <motion.div
          className="absolute left-8 top-16 w-0.5 h-24 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"
          initial={{ height: 0 }}
          whileInView={{ height: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
        />
      )}
    </div>
  );
};

export default TimelineStep;