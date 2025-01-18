import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, DollarSign, BedDouble, Wifi } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getHotelImage } from '@/service/GlobalApi';
import { Skeleton } from '@/components/ui/skeleton';  // Import the Skeleton component

const HotelCard = ({ hotel }) => (
  <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <Link
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.HotelName)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative h-52">
        <Image
          src={hotel.updatedImageURL || '/placeholder.jpg'}
          alt={hotel.HotelName || 'hotel'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageData('/Placeholder.jpg')}
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg">
          <span className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {hotel.PricePerNight}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg line-clamp-1">{hotel.HotelName}</h3>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 min-w-4 mr-1" />
          <span className="line-clamp-1">{hotel.Address}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">{hotel.Rating}</span>
          </div>
          <div className="flex gap-2 text-gray-500">
            <BedDouble className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  </Card>
);

const Hotels = ({ hotelList,address }) => {
  const [hotelsWithImages, setHotelsWithImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImagesInBatches = async () => {
      try {
        const BATCH_SIZE = 5;
        let updatedHotels = [];
        for (let i = 0; i < hotelList.length; i += BATCH_SIZE) {
          const batch = hotelList.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.all(
            batch.map(async (hotel) => {
              const imageUrl = await getHotelImage({
                name: hotel.name,
                address: address
              });

              console.log('imageUrl:', imageUrl);
              return { ...hotel,updatedImageURL : imageUrl };
            })
          );
          updatedHotels = [...updatedHotels, ...batchResults];
        }
        setHotelsWithImages(updatedHotels);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelList?.length) {
      fetchImagesInBatches();
    }
  }, [hotelList]);

  if (loading) {
    return (
      <div className="py-6">
        <h2 className="text-3xl font-bold mb-8">
          Featured Hotels
          <span className="text-gray-500 text-lg font-normal ml-2">({hotelList.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render skeletons as placeholders */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="group overflow-hidden">
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
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-8">
        Featured Hotels
        <span className="text-gray-500 text-lg font-normal ml-2">({hotelsWithImages.length})</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotelsWithImages.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
