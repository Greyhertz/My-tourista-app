
// const amadeus = new Amadeus({
//   clientId: import.meta.env.VITE_AMADEUS_CLIENT_ID,
//   clientSecret: import.meta.env.VITE_AMADEUS_CLIENT_SECRET
// });

// export async function fetchAmadeusHotels(lat: number, lon: number) {
//   try {
//     const response = await amadeus.shopping.hotelOffers.get({
//       latitude: lat,
//       longitude: lon,
//       radius: 20
//     });

//     return response.data || [];
//   } catch (err) {
//     console.error("Amadeus fetch error:", err);
//     return [];
//   }
// }
