import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  MapPin,
  DollarSign,
  Info,
  Navigation,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Shadcn provides a Skeleton component
import { getAttractionImage } from "@/service/GlobalApi";

const DailyPlans = ({ itineraryList, address }) => {
  const [loading, setLoading] = useState(true);
  const [placesWithImages, setPlacesWithImages] = useState([]);
  console.log("itineraryList:", itineraryList);

  useEffect(() => {
    setLoading(true);
    const fetchImagesInBatches = async () => {
      try {
        const BATCH_SIZE = 5;
        let updatedPlaces = [];

        // Iterate over itineraryList in batches
        for (let i = 0; i < itineraryList.length; i += BATCH_SIZE) {
          const currentBatch = itineraryList.slice(i, i + BATCH_SIZE);

          // Process each day in the batch
          const batchResults = await Promise.all(
            currentBatch.map(async (day) => {
              // Process activities for each day
              const updatedActivities = await Promise.all(
                day.Activities.map(async (activity) => {
                  const imageUrl = await getAttractionImage({
                    activity: activity.Activity,
                    activityLocation: activity.ActivityLocation,
                    address: address,
                  });

                  return { ...activity, imageUrl };
                })
              );

              return { ...day, Activities: updatedActivities };
            })
          );

          updatedPlaces = [...updatedPlaces, ...batchResults];
        }

        setPlacesWithImages(updatedPlaces);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (itineraryList?.length) {
      fetchImagesInBatches();
    }
  }, [itineraryList, address]);

  console.log("placesWithImages:", placesWithImages);

  // Check if itineraryList is an array and has items
  if (loading) {
    return (
      <div className="group overflow-hidden">
        <Skeleton className="h-52 w-full rounded-md" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4 rounded" />
          <div className="flex items-center text-sm text-gray-600">
            <Skeleton className="h-4 w-16 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-8 rounded" />
            </div>
            <div className="flex gap-2 text-gray-500">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(itineraryList) || itineraryList.length === 0) {
    return <div>No itinerary data available.</div>;
  }

  return (
    <div className="py-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Your Luxury London Itinerary</h1>
        <p className="text-gray-600">
          {itineraryList.length} Days of Experiences
        </p>
      </div>
      <Tabs
        defaultValue={itineraryList[0]?.Day?.toLowerCase() || "day-1"}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
          {itineraryList.map((day, index) => (
            <TabsTrigger
              key={index}
              value={day.Day.toLowerCase()}
              className="px-6 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Day {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {placesWithImages.map((day, dayIndex) => (
          <TabsContent
            key={dayIndex}
            value={day.Day.toLowerCase()}
            className="space-y-6"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">{day.Day}</h2>
              {day.Activities?.map((activity, activityIndex) => (
                <Card key={activityIndex} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                      <Image
                        src={activity.imageUrl || "/placeholder.jpg"} // Use activity-specific image or placeholder
                        alt={activity.Activity}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <CardHeader className="bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl mb-2">
                              {activity.Activity}
                            </CardTitle>

                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock size={16} />
                              <span className="text-sm">
                                {activity.TimeSlot}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-gray-600">
                              <MapPin size={16} />
                              <span className="text-sm">
                                {activity.ActivityLocation}
                              </span>
                            </div>
                          </div>
                          <Badge variant="secondary">{activity.Duration}</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <p className="text-gray-700">
                            {activity.Description}
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <DollarSign size={16} className="text-gray-500" />
                              <span className="text-sm">{activity.Price}</span>
                            </div>
                            {activity.ModeOfTravel &&
                              activity.TravelTime !== "N/A" && (
                                <div className="flex items-center gap-2">
                                  <Navigation
                                    size={16}
                                    className="text-gray-500"
                                  />
                                  <span className="text-sm">
                                    {activity.ModeOfTravel} •{" "}
                                    {activity.TravelTime}
                                  </span>
                                </div>
                              )}
                          </div>

                          {activity.NearbyAttractions?.length > 0 && (
                            <div className="border-t pt-4">
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <MapPin size={16} />
                                Nearby Attractions
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {activity.NearbyAttractions.map(
                                  (attraction, i) => (
                                    <Badge key={i} variant="outline">
                                      {attraction.Name}
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {activity.Tips && (
                            <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-md">
                              <Info
                                size={16}
                                className="text-blue-500 mt-0.5"
                              />
                              <p className="text-sm text-blue-700">
                                {activity.Tips}
                              </p>
                            </div>
                          )}

                          {activity.BookingLink &&
                            activity.BookingLink !== "N/A" && (
                              <a
                                href={activity.BookingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                              >
                                Book Now
                              </a>
                            )}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DailyPlans;
