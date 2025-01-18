


'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Compass, 
  Users, 
  Bot,
  Clock,
  Plane,
  Hotel,
  Utensils,
  Calculator,
  Moon,
  Sun,
  Globe,
  ArrowRight,
  Sparkles,
  Camera,
  CreditCard,
  Star,
  ChevronRight,
  Gift,
  Coffee,
  Car,
  Send,
  Loader2
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from 'next/link';

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      animate={{ 
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{ 
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
    </motion.div>
  </div>
);

// Floating element component
const FloatingElement = ({ children, delay = 0, duration = 5 }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
      rotate: [-1, 1, -1]
    }}
    transition={{ 
      duration,
      repeat: Infinity,
      delay 
    }}
  >
    {children}
  </motion.div>
);

const AnimatedBlob = ({ className }) => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    className={className}
  />
);
// Modified DestinationCard component with improved styling
const DestinationCard = ({ destination, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="group overflow-hidden relative">
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 p-[2px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0  rounded-lg animate-gradient" />
      </div>

      <div className="relative rounded-lg overflow-hidden">
        {/* Image with overlay */}
        <div className="relative h-64 overflow-hidden">
          <motion.img 
            src={`https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt={destination.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Animated overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Rating with animated stars */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </div>
          
          {/* Title with hover effect */}
          <motion.h3 
            className="text-2xl font-bold text-white mb-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {destination.title}
          </motion.h3>
          
          {/* Location and Duration */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-1 text-white/90"
              whileHover={{ y: -2 }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{destination.location}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 text-white/90"
              whileHover={{ y: -2 }}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm">{destination.duration}</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div className="p-4">
        <div className="flex gap-2 flex-wrap">
          {destination.highlights.slice(0, 3).map((highlight, i) => (
            <motion.span 
              key={i} 
              className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {highlight}
            </motion.span>
          ))}
        </div>
      </div>
    </Card>
  </motion.div>
);

const DestinationsSection = () => {
  const [selectedTab, setSelectedTab] = useState('popular');
  
  const destinations = [
    {
      title: "Tokyo Adventure",
      location: "Japan",
      duration: "7 Days",
      highlights: ["Cultural Tours", "Tech Districts", "Local Cuisine"]
    },
    {
      title: "Greek Islands",
      location: "Greece",
      duration: "10 Days",
      highlights: ["Island Hopping", "Ancient Ruins", "Beach Time"]
    },
    {
      title: "Swiss Alps",
      location: "Switzerland",
      duration: "5 Days",
      highlights: ["Hiking", "Skiing", "Mountain Views"]
    }
  ];

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Animated background decorations */}
      <AnimatedBlob className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <AnimatedBlob className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingElement delay={0}>
          <Compass className="w-8 h-8 text-blue-200 absolute top-20 left-20" />
        </FloatingElement>
        <FloatingElement delay={1}>
          <Globe className="w-8 h-8 text-purple-200 absolute top-40 right-40" />
        </FloatingElement>
        <FloatingElement delay={2}>
          <Plane className="w-8 h-8 text-blue-200 absolute bottom-20 right-20" />
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Popular Destinations
            </h2>
          </motion.div>

          <div className="flex justify-center gap-4 mb-8">
            {['popular', 'trending', 'new'].map((tab) => (
              <motion.div
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedTab === tab ? 'default' : 'outline'}
                  onClick={() => setSelectedTab(tab)}
                  className="capitalize relative overflow-hidden"
                >
                  {selectedTab === tab && (
                    <motion.div
                      layoutId="tab-highlight"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {tab}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard 
              key={index} 
              destination={destination} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};


// Stats component
const StatsCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      let start = 0;
      const end = parseInt(value.replace(/,/g, ''));
      const incrementTime = (duration * 1000) / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
          setHasAnimated(true);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [value, duration, hasAnimated]);

  return <span>{count.toLocaleString()}</span>;
};

const features = [
  {
    icon: <Calculator className="w-8 h-8" />,
    title: "Budget Optimization",
    description: "AI allocates your budget efficiently across accommodation, activities, and dining",
    color: "blue"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Day-by-Day Planning",
    description: "Detailed daily schedules optimized for location and opening hours",
    color: "purple"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Group Friendly",
    description: "Customized plans that consider group size and diverse preferences",
    color: "pink"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Smart Routing",
    description: "Efficient travel routes to maximize your sightseeing time",
    color: "indigo"
  }
];
const steps = [
  {
    title: "Tell Us Your Dreams",
    description: "Share your travel preferences, dates, and desired destinations with our AI assistant.",
    icon: "✈️"
  },
  {
    title: "Get Personalized Plans",
    description: "Our AI creates custom itineraries based on your unique preferences and travel style.",
    icon: "🗺️"
  },
  {
    title: "Start Your Adventure",
    description: "Review, customize, and book your perfect trip with confidence.",
    icon: "🌟"
  }
];


const getGradient = (color) => {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600'
  };
  return gradients[color] || gradients.blue;
};

const FeatureCard = ({ feature, index, isHovered, onHover }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="h-full"
    >
      <Card className="p-6 h-full flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${getGradient(feature.color)}`}
        >
          <div className="text-white">
            {feature.icon}
          </div>
        </motion.div>
        <h3 className="text-lg font-semibold mt-4 mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-center flex-grow">{feature.description}</p>
        
        {/* Decorative background effect on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${getGradient(feature.color)}`}
          />
        )}
      </Card>
    </motion.div>
  );
};

const StepCard = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative bg-white p-6 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
    >
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border line */}
      <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 transform -skew-x-12 group-hover:scale-y-110 transition-transform duration-500" />
      
      <div className="flex items-start space-x-4 relative">
        <div className="flex-shrink-0">
          <motion.div 
            className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-200 transition-colors duration-500"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {step.icon}
          </motion.div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-blue-500 font-bold mr-2 group-hover:text-blue-600 transition-colors duration-500">
              Step {index + 1}
            </span>
            <div className="h-px bg-blue-200 flex-1 group-hover:bg-blue-300 transition-colors duration-500" />
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-500">
            {step.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-500">
            {step.description}
          </p>
        </div>
      </div>

      {/* Animated circles in background */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full border-2 border-blue-200/30 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full border-2 border-purple-200/30 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-1000 delay-100" />
    </motion.div>
  );
};

const page = () => {
  
  const [hoveredCard, setHoveredCard] = useState(null);


  return (
    <main className='relative '>
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="container relative max-w-7xl  mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="absolute top-0 right-0 -z-10">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-5 h-5" />
            </motion.div>
            <span className="text-sm font-medium">AI-Powered Trip Planning</span>
          </div>
          <h1 className="text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Your Personal AI<br />
            Travel Planner for<br />
            Perfect Adventures
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Let our advanced AI create personalized day-by-day travel itineraries 
            based on your preferences, budget, and group size.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={'/create-trip'}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg ">
              <Compass className="w-5 h-5 mr-2" />
              Plan Your Trip Now
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.div>
            </Button>
            </Link>
          </motion.div>

          {/* Floating decoration elements */}
          <div className="absolute -z-10">
            <FloatingElement delay={0}>
              <Globe className="w-8 h-8 text-blue-200 absolute -top-20 left-10" />
            </FloatingElement>
            <FloatingElement delay={1}>
              <Plane className="w-8 h-8 text-purple-200 absolute top-20 -left-20" />
            </FloatingElement>
            <FloatingElement delay={2}>
              <Sparkles className="w-8 h-8 text-yellow-200 absolute -bottom-10 left-40" />
            </FloatingElement>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                "0 0 0 20px rgba(59, 130, 246, 0)",
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
            }}
            className="rounded-3xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Travel Planning" 
              className="w-full h-[600px] object-cover"
            />
          </motion.div>

          {/* Interactive floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-10 -left-10"
          >
            <Card className="p-4 backdrop-blur-md bg-white/90 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Group Size</p>
                  <p className="text-sm text-gray-500">4 Travelers</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-40 -right-10"
          >
            <Card className="p-4 backdrop-blur-md bg-white/90 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-gray-500">7 Days Trip</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <Card className="absolute bottom-8 -left-8 p-4 w-80 backdrop-blur-md bg-white/90">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <Bot className="w-10 h-10 text-blue-600" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </div>
              <div>
                <p className="font-medium">AI Planning in Progress</p>
                <p className="text-sm text-gray-500">Customizing your journey...</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="relative bg-gray-50 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
      <div className="container mx-auto px-4 relative max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            How Our AI Plans Your Perfect Trip
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Smart algorithms that understand your travel style and create personalized itineraries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isHovered={hoveredCard === index}
              onHover={setHoveredCard}
            />
          ))}
        </div>
      </div>
    </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Your Journey Starts Here
          </h2>
          <p className="text-gray-600 text-lg">
            Three simple steps to your perfect travel itinerary, powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>

      {/* Sample Itinerary Preview */}
    {/* <ItineraryPreview/> */}

      {/* Features Section */}
      <FeaturesSection />

      {/* Destinations Section */}
      <DestinationsSection />

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50,000", label: "Happy Travelers" },
              { value: "1,000", label: "Destinations" },
              { value: "100,000", label: "Trip Plans Created" },
              { value: "4.9", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-blue-600 mb-2">
                  <StatsCounter value={stat.value} />
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
     <ContactCTASection />
     
     
    </main>
  );
};

export default page;

const ContactCTASection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-600">
              Let's connect and create your perfect travel experience together. Share your dreams, and we'll make them a reality.
            </p>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-full translate-y-1/2 -translate-x-1/2" />

            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your dream vacation..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 transform rotate-45 rounded-3xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
      
      <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Icon container with animations */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.3 }}
          className="mb-6 relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
  <div className="text-blue-600">  {/* Remove text-transparent and bg-clip-text */}
    {feature.icon}
  </div>
</div>
          
          {/* Floating sparkles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Trip Planning",
      description: "Get personalized recommendations and day-by-day itineraries crafted by our advanced AI"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Optimization",
      description: "Perfect for solo travelers, couples, families, or large groups"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Budget Management",
      description: "Smart allocation of your budget across accommodations, activities, and dining"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Optimization",
      description: "Efficient scheduling that maximizes your experiences while avoiding burnout"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Special Occasions",
      description: "Tailored experiences for honeymoons, anniversaries, and celebrations"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Local Experiences",
      description: "Discover hidden gems and authentic local experiences in every destination"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50">
      {/* Background decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"
      />

      <div className="container mx-auto px-4 relative max-w-7xl ">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Plan Smarter, Travel Better
            </h2>
            <p className="text-gray-600 text-lg">
              Let our AI create your perfect itinerary based on your preferences and travel style
            </p>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeaturesCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};



const ItineraryPreview = () => {
  const [activeDay, setActiveDay] = useState(1);
  
  const days = [
    {
      day: 1,
      title: "Cultural Exploration",
      activities: [
        {
          icon: <Hotel className="w-6 h-6" />,
          type: "Morning",
          detail: "Le Marais Boutique Hotel Check-in",
          highlights: ["Rooftop View", "Welcome Drinks"],
          time: "10:00 AM"
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          type: "Afternoon",
          detail: "Louvre Museum Guided Tour",
          highlights: ["Skip-the-line", "Private Guide"],
          time: "2:00 PM"
        },
        {
          icon: <Utensils className="w-6 h-6" />,
          type: "Evening",
          detail: "Seine River Dinner Cruise",
          highlights: ["Sunset Views", "Gourmet Menu"],
          time: "7:30 PM"
        }
      ]
    },
    {
      day: 2,
      title: "Local Experience",
      activities: [
        {
          icon: <Sun className="w-6 h-6" />,
          type: "Morning",
          detail: "Montmartre Walking Tour",
          highlights: ["Local Art", "Cafe Stops"],
          time: "9:00 AM"
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          type: "Afternoon",
          detail: "Eiffel Tower Visit",
          highlights: ["Summit Access", "Photo spots"],
          time: "3:00 PM"
        },
        {
          icon: <Moon className="w-6 h-6" />,
          type: "Evening",
          detail: "Wine Tasting Experience",
          highlights: ["Expert Sommelier", "French Wines"],
          time: "8:00 PM"
        }
      ]
    },
    {
      day: 3,
      title: "Royal Heritage",
      activities: [
        {
          icon: <Clock className="w-6 h-6" />,
          type: "Morning",
          detail: "Versailles Palace Tour",
          highlights: ["Garden Access", "Audio Guide"],
          time: "9:30 AM"
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          type: "Afternoon",
          detail: "Champs-Élysées Shopping",
          highlights: ["Luxury Stores", "Cafe Break"],
          time: "2:30 PM"
        },
        {
          icon: <Star className="w-6 h-6" />,
          type: "Evening",
          detail: "Michelin Star Dinner",
          highlights: ["Tasting Menu", "Wine Pairing"],
          time: "7:00 PM"
        }
      ]
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Floating elements */}
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-3xl"
          />

          <div className="bg-white rounded-2xl shadow-2xl p-8 relative backdrop-blur-sm">
            {/* Header */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-6 mb-8"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-50 p-3 rounded-xl"
              >
                <Bot className="w-8 h-8 text-blue-600" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Your Paris Adventure
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    3 days
                  </span>
                  <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    Paris
                  </span>
                  <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm">
                    <Sun className="w-4 h-4 mr-1" />
                    2 people
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Day selector */}
            <div className="flex gap-2 mb-6">
              {days.map((day) => (
                <motion.button
                  key={day.day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    activeDay === day.day
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Day {day.day}
                </motion.button>
              ))}
            </div>

            {/* Activities */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {days[activeDay - 1].title}
                </h4>
                {days[activeDay - 1].activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm group-hover:bg-blue-100 transition-colors duration-300">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600">
                              {activity.type}
                            </h4>
                            <p className="text-gray-600 mt-1">{activity.detail}</p>
                          </div>
                          <span className="text-sm bg-white px-3 py-1 rounded-full text-gray-500 group-hover:bg-blue-100">
                            {activity.time}
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          {activity.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 group-hover:bg-blue-100"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* CTA Button */}
            <motion.button
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-200/50 hover:shadow-blue-200/80"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Compass className="w-5 h-5" />
              Create Your Own Itinerary
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

