import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Users } from 'lucide-react';

const trips = [
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&q=80&w=600",
    title: "Paris Explorer",
    duration: "7 days",
    rating: 4.9,
    price: "$1,299",
    location: "France"
  },
  {
    image: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&q=80&w=600",
    title: "Tokyo Adventure",
    duration: "10 days",
    rating: 4.8,
    price: "$2,499",
    location: "Japan"
  },
  {
    image: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&q=80&w=600",
    title: "Santorini Escape",
    duration: "5 days",
    rating: 4.9,
    price: "$1,599",
    location: "Greece"
  }
];

const TripCard = ({ trip, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ y: -10 }}
    className="group relative rounded-xl overflow-hidden shadow-lg"
  >
    <div className="aspect-[4/3] overflow-hidden">
      <motion.img
        src={trip.image}
        alt={trip.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-0 p-6 text-white">
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{trip.location}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{trip.rating}</span>
        </div>
        <span className="text-lg font-bold">{trip.price}</span>
      </div>
    </div>
  </motion.div>
);

const SuggestedTrips = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600">Discover our most loved travel experiences</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => (
            <TripCard key={trip.title} trip={trip} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuggestedTrips;