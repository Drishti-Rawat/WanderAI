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
} from "lucide-react";
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
    description: "Stay consious of costs",
    icon: Wallet,
    color: "border-green-500 text-green-700 hover:bg-green-50",
  },
  {
    value: "Moderate",
    label: "Comfort Seeker",
    description: "keep cost on the average side",
    icon: Coins,
    color: "border-blue-500 text-blue-700 hover:bg-blue-50",
  },
  {
    value: "Luxury",
    label: "Luxury Explorer",
    description: "Dont worry about costs",
    icon: Rocket,
    color: "border-purple-500 text-purple-700 hover:bg-purple-50",
  },
];

const selectTravelerList = [
  {
    value: "1 person",
    label: "Just Me",
    description: "A solo traveles in exploration",
    icon: Plane,
    color: "border-cyan-500 text-cyan-700 hover:bg-cyan-50",
  },
  {
    value: "2 person",
    label: "A Couple",
    description: "Two traveles in tandem",
    icon: Wine,
    color: "border-red-500 text-red-700 hover:bg-red-50",
  },
  {
    value: "3 to 4 person",
    label: "Family",
    description: "A group of fun loving adv",
    icon: Home,
    color: "border-green-500 text-green-700 hover:bg-green-50",
  },
  {
    value: "5 to 9 person",
    label: "Friends",
    description: "A bunch of thrill-seeks",
    icon: Sailboat,
    color: "border-blue-500 text-blue-700 hover:bg-blue-50",
  },
];

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
    <div className="relative w-full">
      <div className="flex items-center border-2 border-gray-300 rounded-lg">
        <MapPin className="ml-3 text-gray-400" size={20} />
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter destination"
          className="w-full p-3 pl-2 rounded-lg focus:outline-none"
        />
        {isLoading && (
          <div className="mr-3 animate-spin">
            <Search size={20} className="text-gray-400" />
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <MapPin className="mr-2 text-gray-500" size={16} />
              <span>{suggestion.display_name}</span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
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
          <p className="text-sm text-gray-500">Please wait while we create your itinerary...</p>
        </div>
      </div>
    );

    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace("{location}", data?.destination)
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
        docId: docId
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
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preference.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-6  ">
        {/* Destination Input */}
        <div>
          <label className="block text-lg font-medium mb-2">
            What is your destination of choice?
          </label>
          <Controller
            name="destination"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DestinationAutocomplete
                onChange={(val) => {
                  onChange(val);
                  setValue("destination", val);
                }}
                value={value}
                error={errors.destination?.message}
              />
            )}
          />
        </div>

        {/* Trip Days Input */}
        <div>
          <label className="block text-lg font-medium mb-2">
            How many days are you planning your trip?
          </label>
          <input
            type="number"
            {...register("days")}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Enter number of days"
          />
          {errors.days && (
            <p className="text-red-500 mt-1">{errors.days.message}</p>
          )}
        </div>

        {/* Budget Selection */}
        <div>
          <label className="block text-lg font-medium mb-4">
            What is your budget?
          </label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <div className="grid md:grid-cols-3 gap-4">
                {budgetOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <label
                      key={option.value}
                      className={`
                        cursor-pointer p-5 border-2 rounded-xl text-center transition duration-300
                        ${
                          field.value === option.value
                            ? `${option.color} border-opacity-100 ring-2 ring-opacity-50`
                            : "border-gray-300 border-opacity-50 text-gray-600 hover:border-opacity-100"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        {...field}
                        value={option.value}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center space-y-3">
                        <Icon className="w-12 h-12 mb-2" strokeWidth={1.5} />
                        <h3 className="font-bold text-xl">{option.label}</h3>
                        <p className="text-sm opacity-70">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.budget && (
            <p className="text-red-500 mt-2 text-center">
              {errors.budget.message}
            </p>
          )}
        </div>

        {/* people selection */}
        <div>
          <label className="block text-lg font-medium mb-4">
            Who do you plan on traveling with on your next adventure?
          </label>
          <Controller
            name="traveler"
            control={control}
            render={({ field }) => (
              <div className="grid md:grid-cols-3 gap-4">
                {selectTravelerList.map((option) => {
                  const Icon = option.icon;
                  return (
                    <label
                      key={option.value}
                      className={`
                        cursor-pointer p-5 border-2 rounded-xl text-center transition duration-300
                        ${
                          field.value === option.value
                            ? `${option.color} border-opacity-100 ring-2 ring-opacity-50`
                            : "border-gray-300 border-opacity-50 text-gray-600 hover:border-opacity-100"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        {...field}
                        value={option.value}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center space-y-3">
                        <Icon className="w-12 h-12 mb-2" strokeWidth={1.5} />
                        <h3 className="font-bold text-xl">{option.label}</h3>
                        <p className="text-sm opacity-70">
                          {option.description}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.budget && (
            <p className="text-red-500 mt-2 text-center">
              {errors.budget.message}
            </p>
          )}
        </div>

        {/* Submit Button */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101 shadow-lg hover:shadow-xl"
        >
          Submit Preferences
        </button>
      </form>
    </div>
  );
};

export default CreateTripPage;
