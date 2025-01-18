'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const Footer = () => {
  const footerColumns = [
    {
      title: "Company",
      links: ["About", "Careers", "Press", "Blog"]
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Privacy Policy", "Terms"]
    },
    {
      title: "Resources",
      links: ["Destinations", "Travel Guides", "FAQs", "Community"]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#" }
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: "contact@aitravelplanner.com" },
    { icon: <MapPin className="w-5 h-5" />, text: "123 Travel Street, Journey City" },
    { icon: <Phone className="w-5 h-5" />, text: "+1 (555) 123-4567" }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Main footer content */}
      <div className="bg-white pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Travel Planner
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your personal AI-powered travel companion for creating perfect trip itineraries. Let us transform your travel dreams into unforgettable experiences.
              </p>
              
              {/* Contact information */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-600">
                    <div className="text-blue-600">{item.icon}</div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Links columns */}
            {footerColumns.map((column, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="font-bold mb-6 text-gray-900">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      <a 
                        href="#" 
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span className="relative">
                          {link}
                          <motion.span 
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                            whileHover={{ width: "100%" }}
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} AI Travel Planner. All rights reserved.
              </p>
              
              {/* Social links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-full bg-gray-50 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;