import axios from "axios";

const UNSPLASH_ACCESS_KEY = "fJrrE7qMyacwyery4Vv7q3LLb-7KplUq0kPtc0X3OC4"; // Replace with your real key

export async function fetchImage(countryName: string): Promise<string> {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: `${countryName} tourism`,
        per_page: 1,
        orientation: "landscape"
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    const results = res.data.results;

    if (results.length > 0) {
      return results[0].urls.regular;
    } else {
      return `https://source.unsplash.com/600x400/?${countryName},travel`; // fallback
    }
  } catch (error) {
    console.error("Failed to fetch image from Unsplash:", error);
    return `https://source.unsplash.com/600x400/?${countryName},travel`; // fallback
  }
}
// const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;

// export async function fetchImage(query: string) {
//   const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}`);
//   const data = await res.json();
//   return data.results?.[0]?.urls?.regular || "";
// }
