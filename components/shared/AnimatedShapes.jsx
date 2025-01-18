import { motion } from 'framer-motion';

const shapes = [
  {
    color: 'bg-blue-200/40',
    size: 'w-[500px] h-[500px]',
    initialPosition: { top: '-15%', left: '-5%' },
  },
  {
    color: 'bg-purple-200/40',
    size: 'w-[600px] h-[600px]',
    initialPosition: { top: '30%', right: '-10%' },
  },
  {
    color: 'bg-indigo-200/40',
    size: 'w-[400px] h-[400px]',
    initialPosition: { bottom: '-10%', left: '35%' },
  },
];

export const AnimatedShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-50">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.color} ${shape.size} rounded-full mix-blend-multiply filter blur-[64px]`}
          style={shape.initialPosition}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};