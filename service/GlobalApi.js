// 'use server'

// export async function getDestinationImage(destination) {

//   if (!destination) {
//     throw new Error('Destination is required')
//   }

//   try {
//     const response = await fetch(
//       `https://api.unsplash.com/search/photos?query=${destination}+travel+landmark&per_page=1`,
//       {
//         headers: {
//           Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
//         }
//       }
//     )

//     const data = await response.json()
    
//     if (data.results && data.results.length > 0) {
//       return { 
//         success: true,
//         imageUrl: data.results[0].urls.regular,
//         photographer: data.results[0].user.name,
//         photographerUrl: data.results[0].user.links.html
//       }
//     } else {
//       throw new Error('No images found for this destination')
//     }
//   } catch (error) {
//     console.error('API Error:', error)
//     throw new Error('Failed to fetch image')
//   }
// }


// const imageCache = {}

// export async function getHotelImage(address) {
//   if (imageCache[address]) {
//     return imageCache[address]
//   }

//   const fallbackQueries = ['hotel', 'building', 'cityscape']

//   for (const query of [address, ...fallbackQueries]) {
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
//         {
//           headers: {
//             Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
//           },
//         }
//       )

//       if (response.ok) {
//         const data = await response.json()
//         const imageUrl = data.results?.[0]?.urls?.regular
//         if (imageUrl) {
//           imageCache[address] = imageUrl
//           return imageUrl
//         }
//       }
//     } catch (error) {
//       console.error(`Failed to fetch image for query "${query}":`, error)
//     }
//   }

//   imageCache[address] = '/placeholder.jpg'
//   return '/placeholder.jpg'
// }


'use server'

import Together from "together-ai";

const client = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

export async function getDestinationImage(destination) {
  try {
    const response = await client.images.create({
      prompt: `Photorealistic view of ${destination}, famous landmark, travel destination, high quality, detailed`,
      model: "black-forest-labs/FLUX.1-schnell",
      width: 1024,
      height: 768,
      response_format: "base64"
    });
    
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}



export async function getHotelImage(hotelData) {
  const { name, address } = hotelData;


  try {
    const response = await client.images.create({
      prompt: ` exterior  view of ${name} hotel building in ${address}, high quality`,
      model: "black-forest-labs/FLUX.1-schnell",
      width: 1024,
      height: 768,
      response_format: "base64"
    });

    if (response.data?.[0]) {
      const imageUrl = `data:image/jpeg;base64,${response?.data?.[0]?.b64_json}`;
      return imageUrl;
    }
  } catch (error) {
    console.error(`Failed to generate image for hotel "${name}":`, error);
  }
  return '/placeholder.jpg';
}
export async function getAttractionImage(AttractionData) {
  const { activity,activityLocation, address } = AttractionData;
  

  try {
    const response = await client.images.create({
      prompt: ` proivde the image  of an  activity ${activity} place at   ${activityLocation}  in ${address}, high quality`,
      model: "black-forest-labs/FLUX.1-schnell",
      width: 1024,
      height: 768,
      response_format: "base64"
    });

    if (response.data?.[0]) {
      const imageUrl = `data:image/jpeg;base64,${response?.data?.[0]?.b64_json}`;
      return imageUrl;
    }
  } catch (error) {
    console.error(`Failed to generate image for hotel "${name}":`, error);
  }
  return '/placeholder.jpg';
}