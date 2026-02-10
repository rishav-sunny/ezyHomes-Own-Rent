import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const popularCityByState = {
  "andhra pradesh": { city: "Visakhapatnam", lat: "17.6868", lng: "83.2185" },
  "arunachal pradesh": { city: "Itanagar", lat: "27.0844", lng: "93.6053" },
  "assam": { city: "Guwahati", lat: "26.1445", lng: "91.7362" },
  "bihar": { city: "Patna", lat: "25.5941", lng: "85.1376" },
  "chhattisgarh": { city: "Raipur", lat: "21.2514", lng: "81.6296" },
  "delhi": { city: "New Delhi", lat: "28.6139", lng: "77.2090" },
  "goa": { city: "Panaji", lat: "15.4909", lng: "73.8278" },
  "gujarat": { city: "Ahmedabad", lat: "23.0225", lng: "72.5714" },
  "haryana": { city: "Gurugram", lat: "28.4595", lng: "77.0266" },
  "himachal pradesh": { city: "Shimla", lat: "31.1048", lng: "77.1734" },
  "jharkhand": { city: "Ranchi", lat: "23.3441", lng: "85.3096" },
  "karnataka": { city: "Bengaluru", lat: "12.9716", lng: "77.5946" },
  "kerala": { city: "Kochi", lat: "9.9312", lng: "76.2673" },
  "ladakh": { city: "Leh", lat: "34.1526", lng: "77.5771" },
  "madhya pradesh": { city: "Bhopal", lat: "23.2599", lng: "77.4126" },
  "maharashtra": { city: "Mumbai", lat: "19.0760", lng: "72.8777" },
  "manipur": { city: "Imphal", lat: "24.8170", lng: "93.9368" },
  "meghalaya": { city: "Shillong", lat: "25.5788", lng: "91.8933" },
  "mizoram": { city: "Aizawl", lat: "23.7271", lng: "92.7176" },
  "nagaland": { city: "Kohima", lat: "25.6751", lng: "94.1086" },
  "odisha": { city: "Bhubaneswar", lat: "20.2961", lng: "85.8245" },
  "punjab": { city: "Ludhiana", lat: "30.9000", lng: "75.8573" },
  "rajasthan": { city: "Jaipur", lat: "26.9124", lng: "75.7873" },
  "sikkim": { city: "Gangtok", lat: "27.3389", lng: "88.6065" },
  "tamil nadu": { city: "Chennai", lat: "13.0827", lng: "80.2707" },
  "telangana": { city: "Hyderabad", lat: "17.3850", lng: "78.4867" },
  "tripura": { city: "Agartala", lat: "23.8315", lng: "91.2868" },
  "uttar pradesh": { city: "Lucknow", lat: "26.8467", lng: "80.9462" },
  "uttarakhand": { city: "Dehradun", lat: "30.3165", lng: "78.0322" },
  "west bengal": { city: "Kolkata", lat: "22.5726", lng: "88.3639" },
  "chandigarh": { city: "Chandigarh", lat: "30.7333", lng: "76.7794" },
  "jammu and kashmir": { city: "Srinagar", lat: "34.0837", lng: "74.7973" }
};

const aliases = {
  "orissa": "odisha",
  "uttaranchal": "uttarakhand",
  "bangalore": "karnataka",
  "new delhi": "delhi",
  "j&k": "jammu and kashmir",
  "jammu kashmir": "jammu and kashmir"
};

const normalizeState = (state) => {
  if (!state) return "";
  const key = state.trim().toLowerCase();
  return aliases[key] || key;
};

async function updatePopularCitiesByState() {
  try {
    const posts = await prisma.post.findMany();
    console.log(`Found ${posts.length} properties.`);

    let updated = 0;
    let skipped = 0;

    for (const post of posts) {
      const stateKey = normalizeState(post.state);
      const match = popularCityByState[stateKey];

      if (!match) {
        skipped += 1;
        continue;
      }

      await prisma.post.update({
        where: { id: post.id },
        data: {
          city: match.city,
          latitude: match.lat,
          longitude: match.lng,
        },
      });

      updated += 1;
    }

    console.log(`Updated ${updated} properties.`);
    console.log(`Skipped ${skipped} properties (missing or unknown state).`);
  } catch (error) {
    console.error("Error updating cities:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updatePopularCitiesByState();
