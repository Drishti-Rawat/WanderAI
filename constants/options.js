export const AI_PROMPT = `
Generate a {days} days travel plan for a {traveler} visiting {location} on a {budget} budget. The plan should include:

1. **Hotels**: Provide at least 5 options for the location  with the following details:
   - Hotelname
   - Address
   - PricePerNight
   - ImageURL
   - Geo-coordinates (latitude and longitude)
   - Rating
   - description

2. **Itinerary**: A detailed time-to-time itinerary for  exact {days} days plan, including the following:
   - Divide each day into specific time slots (e.g., 9:00 AM - 10:30 AM).
   - Include the following details for each time slot:
     - **TimeSlot**: e.g., 9:00 AM - 10:30 AM
     - **Activity**: Name of the activity or place.
     - **ActivityLocation**: Name of the activity or place.
     - **Description**: A brief description of the activity or place.
     - **Price**: Cost for the activity, meal, or ticket (if applicable).
     - **Duration**: The expected time to spend at the activity (e.g., 1 hour).
     - **NearbyAttractions**: List 1-2 nearby attractions with (Distance and Name)
     - **Best Time to Visit**: Suggested visiting hours for popular places.
     - **ModeOfTravel**: Transport options (e.g., walking, taxi).
     - **TravelTime**: Time to travel between activities.
     - **TravelDistance**: Approximate distance between places.
     - **Tips**: Useful travel tips (e.g., “Buy tickets in advance”).
     - **BookingLink**: If tickets are available online.
    

   - Ensure each day is planned sequentially, accounting for travel time, meals, rest periods, and weather conditions.
   - Provide a **map link** for each location (Google Maps).

3. **Format**: Return the data in **JSON format**, structured as follows:
   - **Hotels**: An array of hotel objects with their details.
   - **Itinerary**: An array of day objects for  {days} days, with each containing:
     - **Activities**: An array of time-slotted activities with detailed place information,and additional information.

Ensure the JSON response is well-structured, adheres to the requested schema, and is easy to parse.
`
