// import Image from 'next/image';
// import { Send, Calendar, Users, Wallet } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { getDestinationImage } from '@/service/GlobalApi';

// const InfoSection = ({ trip }) => {
//   const [imageUrl, setImageUrl] = useState('/Placeholder.jpg');
//   const [loading, setLoading] = useState(false);

//   const generateImage = async () => {
//     if (!trip?.destination) return;
    
//     setLoading(true);
//     try {
//       const result = await getDestinationImage(trip.destination);
//       setImageUrl(result.imageUrl);
//     } catch (error) {
//       console.error('Error:', error);
//       setImageUrl('/Placeholder.jpg');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (trip) generateImage();
//   }, [trip]);

//   if (!trip) return null;

//   return (
//     <div className="space-y-4">
//       <div className="relative rounded-xl overflow-hidden shadow-lg">
//         {loading ? (
//           <Skeleton className="w-full h-[400px]" />
//         ) : (
//           <Image
//             src={imageUrl}
//             alt={trip.destination}
//             width={1000}
//             height={400}
//             className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
//             priority
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="space-y-3 flex-1">
//           <h2 className="text-2xl font-bold">{trip.destination}</h2>
//           <div className="flex flex-wrap gap-2">
//             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
//               <Calendar className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-600">{trip.days} days</span>
//             </div>
//             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
//               <Wallet className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-600">{trip.budget} Budget</span>
//             </div>
//             <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
//               <Users className="w-4 h-4 text-gray-500" />
//               <span className="text-sm text-gray-600">{trip.traveler} Travelers</span>
//             </div>
//           </div>
//         </div>
        
//         <Button className="min-w-[100px]" size="lg">
//           <Send className="w-4 h-4 mr-2" />
//           Share
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default InfoSection;

'use client';
import Image from 'next/image';
import { Send, Calendar, Users, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getDestinationImage } from '@/service/GlobalApi';

const InfoSection = ({ trip }) => {
  const [imageData, setImageData] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!trip?.destination) return;
    
    setLoading(true);
    try {
      const response = await getDestinationImage(trip.destination);
      const base64Data = response?.data?.[0]?.b64_json;
      if (base64Data) {
        setImageData(`data:image/png;base64,${base64Data}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setImageData('/Placeholder.jpg');
    } finally {
      setLoading(false);
    }
  };

  // console.log('imageData:', imageData);

  useEffect(() => {
    if (trip) generateImage();
  }, [trip]);

  if (!trip) return null;

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px]">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          <Image
            src={imageData || '/Placeholder.jpg'}
            alt={trip.destination}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageData('/Placeholder.jpg')}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-3 flex-1">
          <h2 className="text-2xl font-bold">{trip.destination}</h2>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{trip.days} days</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
              <Wallet className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{trip.budget} Budget</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{trip.traveler} Travelers</span>
            </div>
          </div>
        </div>
        
        <Button className="min-w-[100px]" size="lg">
          <Send className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;