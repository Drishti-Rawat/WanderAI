'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InfoSection from '../_components/InfoSection';
import Hotels from '../_components/Hotels';
import DailyPlans from '../_components/DailyPlans';
import { Skeleton } from '@/components/ui/skeleton'; // If you're using Shadcn, otherwise use custom skeleton styles.

const TripDetails = ({ params }) => {
    const [tripData, setTripData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const tripId = React.use(params).tripId;

    const fetchTripData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/fetchTripDetails', {
                docId: tripId
            });
            setTripData(response.data.data);
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to fetch trip data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTripData();
    }, []);

    console.log("trip data", tripData)

    if (isLoading || !tripData) {
        return (
            <div className="p-10 md:px-20 lg:px-44 xl:px-56 space-y-10">
                {/* Skeleton for InfoSection */}
                <Skeleton className="w-full h-20" />
                {/* Skeleton for Hotels */}
                <Skeleton className="w-full h-60" />
                {/* Skeleton for DailyPlans */}
                <Skeleton className="w-full h-96" />
            </div>
        );
    }

    if (error) return <div>Error: {error}</div>;
    // if (!tripData) return <div>No trip data found</div>;

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <InfoSection trip={tripData?.userSelection} />
            <Hotels hotelList={tripData?.tripData?.Hotels}  address = {tripData?.userSelection.destination}/>
            <DailyPlans itineraryList={tripData?.tripData?.Itinerary} address = {tripData?.userSelection.destination} />
        </div>
    );
};

export default TripDetails;
