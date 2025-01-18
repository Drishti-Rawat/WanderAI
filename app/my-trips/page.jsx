"use client";

import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyTripsPage = () => {
  const { userDetails } = useContext(UserDetailsContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchAllTrips = async (email) => {
    try {
      const response = await fetch(`/api/getUserAllTrips?email=${email}`, {
        method: "GET",
      });
      if (!response.ok) throw new Error("Failed to fetch trips");
      const data = await response.json();
      setTrips(data.trips);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails) {
      fetchAllTrips(userDetails?.email);
    }
  }, [userDetails]);

  if (error)
    return (
      <div className="p-10 text-red-600 rounded-lg bg-red-50 font-medium">
        Error: {error}
      </div>
    );

  const TripSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <h2 className="font-bold text-3xl mb-8 text-gray-800">My Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? [...Array(6)].map((_, index) => <TripSkeleton key={index} />)
          : trips.map((trip, index) => (
              <Card key={index} className="overflow-hidden group"     onClick={() => router.push(`/view-trip/${trip.id}`)}>
                <div className="relative  h-48 ">
                  <Image
                    src={"/placeholder.jpg"}
                    alt={"hotel"}
                    fill
                    className="object-cover  group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {trip.userSelection.destination}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {trip.userSelection.days} days •{" "}
                    {trip.userSelection.traveler} travelers
                  </p>
                  <p className="text-gray-600 mt-1">
                    Budget: {trip.userSelection.budget}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default MyTripsPage;
