"use client";

import React, { useState, useEffect, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";

import {
  Wallet,
  Coins,
  Rocket,
  MapPin,
  Search,
  Plane,
  Wine,
  Home,
  Sailboat,
  Loader2,
  Cloud,
  Sun,
  Compass,
  Snowflake,
  Mountain,
  Star,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const tripSchema = yup.object({
  destination: yup
    .string()
    .required("Destination is required")
    .min(3, "Too short!"),
  days: yup
    .number()
    .required("Number of days is required")
    .positive("Days must be a positive number")
    .integer("Days must be a whole number"),
  budget: yup.string().required("Please select a budget option"),
  traveler: yup.string().required("Please select a  travelers"),
});

const budgetOptions = [
  {
    value: "Cheap",
    label: "Budget Traveler",
    description: "Stay conscious of costs",
    icon: Wallet,
    color: "border-green-500 text-green-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-green-100 hover:via-green-50 hover:to-transparent",
    selectedBg: "bg-gradient-to-br from-green-100 via-green-50 to-transparent",
  },
  {
    value: "Moderate",
    label: "Comfort Seeker",
    description: "keep cost on the average side",
    icon: Coins,
    color: "border-blue-500 text-blue-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-blue-100 hover:via-blue-50 hover:to-transparent",
    selectedBg: "bg-gradient-to-br from-blue-100 via-blue-50 to-transparent",
  },
  {
    value: "Luxury",
    label: "Luxury Explorer",
    description: "Dont worry about costs",
    icon: Rocket,
    color: "border-purple-500 text-purple-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-purple-100 hover:via-purple-50 hover:to-transparent",
    selectedBg:
      "bg-gradient-to-br from-purple-100 via-purple-50 to-transparent",
  },
];

const selectTravelerList = [
  {
    value: "1 person",
    label: "Just Me",
    description: "A solo traveler in exploration",
    icon: Plane,
    color: "border-cyan-500 text-cyan-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-cyan-100 hover:via-cyan-50 hover:to-transparent",
    selectedBg: "bg-gradient-to-br from-cyan-100 via-cyan-50 to-transparent",
  },
  {
    value: "2 person",
    label: "A Couple",
    description: "Two travelers in tandem",
    icon: Wine,
    color: "border-rose-500 text-rose-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-rose-100 hover:via-rose-50 hover:to-transparent",
    selectedBg: "bg-gradient-to-br from-rose-100 via-rose-50 to-transparent",
  },
  {
    value: "3 to 4 person",
    label: "Family",
    description: "A group of fun loving adv",
    icon: Home,
    color: "border-emerald-500 text-emerald-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-emerald-100 hover:via-emerald-50 hover:to-transparent",
    selectedBg:
      "bg-gradient-to-br from-emerald-100 via-emerald-50 to-transparent",
  },
  {
    value: "5 to 9 person",
    label: "Friends",
    description: "A bunch of thrill-seeks",
    icon: Sailboat,
    color: "border-indigo-500 text-indigo-700",
    hoverBg:
      "hover:bg-gradient-to-br hover:from-indigo-100 hover:via-indigo-50 hover:to-transparent",
    selectedBg:
      "bg-gradient-to-br from-indigo-100 via-indigo-50 to-transparent",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Floating animation for decorative elements
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotate animation for compass
const rotateAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Subtle scale animation for cards
const cardAnimation = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const DecorativeElements = () => (
  <>
    <motion.div
      className="fixed left-10 top-20 text-blue-300 opacity-20 z-10"
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Cloud size={40} />
    </motion.div>

    <motion.div
      className="fixed right-20 top-40 text-yellow-400 opacity-30 z-10"
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Sun size={50} />
    </motion.div>

    <motion.div
      className="fixed left-32 bottom-20 text-purple-400 opacity-20"
      variants={rotateAnimation}
      initial="initial"
      animate="animate"
    >
      <Compass size={60} />
    </motion.div>

    <motion.div
      className="fixed right-1/4 top-1/6 text-green-400 opacity-20"
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Snowflake size={45} />
    </motion.div>

    <motion.div
      className="fixed left-1/3 top-1/4 text-indigo-300 opacity-20"
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Mountain size={40} />
    </motion.div>

    <motion.div
      className="fixed right-40 bottom-1/4 text-yellow-300 opacity-30"
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Star size={30} />
    </motion.div>

    <motion.div
      className="fixed right-30 bottom-20 text-blue-200 opacity-20"
      variants={floatingAnimation}
      initial="initial"
      animate="animate"
    >
      <Wind size={35} />
    </motion.div>
  </>
);

const DestinationAutocomplete = ({ onChange, value, error }) => {
  const [input, setInput] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Suggestions:", suggestions);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onChange(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.display_name);
    onChange(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <motion.div
      className="relative w-full"
      initial="hidden"
      animate="visible"
      variants={itemVariants}
    >
      <motion.div
        className="flex items-center border-2 border-gray-300 rounded-lg"
        whileFocus={{
          borderColor: "#3B82F6",
          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
        }}
        transition={{ duration: 0.2 }}
      >
        <MapPin className="ml-3 text-gray-400" size={20} />
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter destination"
          className="w-full p-3 pl-2 rounded-lg focus:outline-none"
        />
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              className="mr-3"
            >
              <Search size={20} className="text-gray-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg"
          >
            {suggestions.map((suggestion) => (
              <motion.li
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                whileHover={{ backgroundColor: "#F3F4F6" }}
                whileTap={{ scale: 0.98 }}
              >
                <MapPin className="mr-2 text-gray-500" size={16} />
                <span>{suggestion.display_name}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AnimatedFormContainer = ({ children }) => {
  return (
    <div className="relative p-2 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl">
      {/* Animated border/glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-20 animate-pulse" />

      {/* Inner white background */}
      <div className="relative bg-white  rounded-2xl shadow-xl">{children}</div>
    </div>
  );
};

const cardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.05)",
    transition: {
      duration: 0.15,
    },
  },
  selected: {
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const glowVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  hover: {
    opacity: 0.8,
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  initial: {
    y: 0,
    rotate: 0,
  },
  hover: {
    y: [-2, 2, -2],
    rotate: [-5, 5, -5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const CreateTripPage = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [isLoading, setIsLoading] = useState(false);
  console.log(userDetails);
  const router = useRouter();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tripSchema),
  });

  const onSubmit = async (data) => {
    if (!userDetails) {
      toast.error("Please sign in to create a trip");
      router.push("/sign-in");
      return;
    }

    setIsLoading(true);

    // Show loading toast with spinner
    const toastId = toast.loading(
      <div className="flex items-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin" />
        <div>
          <p className="font-semibold">Generating your perfect trip</p>
          <p className="text-sm text-gray-500">
            Please wait while we create your itinerary...
          </p>
        </div>
      </div>
    );

    try {
      const FINAL_PROMPT = AI_PROMPT.replace("{location}", data?.destination)
        .replace("{days}", data?.days)
        .replace("{traveler}", data?.traveler)
        .replace("{budget}", data?.budget)
        .replace("{days}", data?.days)
        .replace("{days}", data?.days);

      console.log(FINAL_PROMPT);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const docId = Date.now().toString();
      const tripData = result?.response.text();
      await axios.post("/api/save-ai-trip", {
        tripData: JSON.parse(tripData),
        formData: data,
        EmailAddress: userDetails?.email,
        docId: docId,
      });

      // Dismiss loading toast and show success
      toast.dismiss(toastId);
      toast.success("Trip plan generated successfully!");
      router.push(`/view-trip/${docId}`);
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(toastId);
      toast.error("Failed to generate trip plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12"
      >
        <DecorativeElements />
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5  max-w-6xl mx-auto">
          <motion.div className="text-center mb-6" variants={itemVariants}>
            <motion.h2
              className="font-bold text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Plan Your Dream Journey
            </motion.h2>
            <motion.p
              className="mt-3 text-gray-600 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let our AI-powered trip planner create your perfect itinerary
            </motion.p>
          </motion.div>
          <AnimatedFormContainer>
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 bg-white p-8 rounded-2xl shadow-xl"
              variants={containerVariants}
            >
              {/* Destination Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-lg font-medium mb-2">
                  Where would you like to go?
                </label>
                <Controller
                  name="destination"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DestinationAutocomplete
                      onChange={onChange}
                      value={value}
                      error={errors.destination?.message}
                    />
                  )}
                />
              </motion.div>

              {/* Days Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-lg font-medium mb-2">
                  Duration of your adventure
                </label>
                <motion.input
                  type="number"
                  {...register("days")}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none"
                  whileFocus={{
                    borderColor: "#3B82F6",
                    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
                  }}
                  transition={{ duration: 0.2 }}
                />
                <AnimatePresence>
                  {errors.days && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 mt-1"
                    >
                      {errors.days.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Budget Selection */}
              <motion.div variants={itemVariants}>
                <label className="block text-lg font-medium mb-4">
                  What's your budget range?
                </label>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <motion.div
                      className="grid md:grid-cols-3 gap-4"
                      variants={containerVariants}
                    >
                      {budgetOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = field.value === option.value;

                        return (
                          <motion.label
                            key={option.value}
                            className={`
              relative overflow-hidden cursor-pointer p-5 border-2 rounded-xl
              transition-all duration-300
              ${option.hoverBg}
              ${
                isSelected
                  ? `${option.color} ${option.selectedBg} border-opacity-100`
                  : "border-gray-300 border-opacity-50"
              }
            `}
                            variants={cardVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={isSelected ? "selected" : "initial"}
                          >
                            <motion.div
                              className="absolute inset-0 opacity-0"
                              variants={glowVariants}
                              initial="initial"
                              whileHover="hover"
                              style={{
                                background: `radial-gradient(circle at center, currentColor 0%, transparent 100%)`,
                              }}
                            />

                            <input
                              type="radio"
                              {...field}
                              value={option.value}
                              className="hidden"
                            />

                            <div className="relative z-10 flex flex-col items-center space-y-3">
                              <motion.div
                                className="relative"
                                variants={iconVariants}
                              >
                                <Icon
                                  className="w-12 h-12 mb-2"
                                  strokeWidth={1.5}
                                />
                                {isSelected && (
                                  <motion.div
                                    className="absolute -inset-4 rounded-full"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                      opacity: [0.2, 0.4, 0.2],
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    style={{
                                      background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
                                    }}
                                  />
                                )}
                              </motion.div>

                              <motion.h3
                                className="font-bold text-xl"
                                variants={{
                                  hover: {
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                  },
                                }}
                              >
                                {option.label}
                              </motion.h3>

                              <p className="text-sm opacity-70">
                                {option.description}
                              </p>
                            </div>
                          </motion.label>
                        );
                      })}
                    </motion.div>
                  )}
                />
              </motion.div>

              {/* Travelers Selection */}
              <motion.div variants={itemVariants}>
                <label className="block text-lg font-medium mb-4">
                  Who's joining your journey?
                </label>
                <Controller
                  name="traveler"
                  control={control}
                  render={({ field }) => (
                    <motion.div
                      className="grid md:grid-cols-4 gap-4"
                      variants={containerVariants}
                    >
                      {selectTravelerList.map((option) => {
                        const Icon = option.icon;
                        const isSelected = field.value === option.value;

                        return (
                          <motion.label
                            key={option.value}
                            className={`
              relative overflow-hidden cursor-pointer p-5 border-2 rounded-xl
              transition-all duration-300
              ${option.hoverBg}
              ${
                isSelected
                  ? `${option.color} ${option.selectedBg} border-opacity-100`
                  : "border-gray-300 border-opacity-50"
              }
            `}
                            variants={cardVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            animate={isSelected ? "selected" : "initial"}
                          >
                            <motion.div
                              className="absolute inset-0 opacity-0"
                              variants={glowVariants}
                              initial="initial"
                              whileHover="hover"
                              style={{
                                background: `radial-gradient(circle at center, currentColor 0%, transparent 100%)`,
                              }}
                            />

                            <input
                              type="radio"
                              {...field}
                              value={option.value}
                              className="hidden"
                            />

                            <div className="relative z-10 flex flex-col items-center space-y-3">
                              <motion.div
                                className="relative"
                                variants={iconVariants}
                              >
                                <Icon
                                  className="w-12 h-12 mb-2"
                                  strokeWidth={1.5}
                                />
                                {isSelected && (
                                  <motion.div
                                    className="absolute -inset-4 rounded-full"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                      opacity: [0.2, 0.4, 0.2],
                                      scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                    }}
                                    style={{
                                      background: `radial-gradient(circle, currentColor 0%, transparent 70%)`,
                                    }}
                                  />
                                )}
                              </motion.div>

                              <motion.h3
                                className="font-bold text-xl"
                                variants={{
                                  hover: {
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                  },
                                }}
                              >
                                {option.label}
                              </motion.h3>

                              <p className="text-sm opacity-70">
                                {option.description}
                              </p>
                            </div>
                          </motion.label>
                        );
                      })}
                    </motion.div>
                  )}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="flex items-center justify-center space-x-2"
                  animate={isLoading ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Creating your perfect trip...</span>
                    </>
                  ) : (
                    <>
                      <Plane />
                      <span>Start your adventure</span>
                    </>
                  )}
                </motion.span>
              </motion.button>
            </motion.form>
          </AnimatedFormContainer>
        </div>
      </motion.div>
    </>
  );
};

export default CreateTripPage;
