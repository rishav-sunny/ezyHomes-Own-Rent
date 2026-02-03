import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mapping of US cities to Indian cities with coordinates
const cityMapping = {
  "Miami": { name: "Mumbai", lat: "19.0760", lng: "72.8777" },
  "New York": { name: "Delhi", lat: "28.6139", lng: "77.2090" },
  "San Francisco": { name: "Bangalore", lat: "12.9716", lng: "77.5946" },
  "Denver": { name: "Pune", lat: "18.5204", lng: "73.8567" },
  "Los Angeles": { name: "Hyderabad", lat: "17.3850", lng: "78.4867" },
  "Chicago": { name: "Chennai", lat: "13.0827", lng: "80.2707" },
  "Seattle": { name: "Kolkata", lat: "22.5726", lng: "88.3639" },
  "San Diego": { name: "Ahmedabad", lat: "23.0225", lng: "72.5714" },
  "Boston": { name: "Jaipur", lat: "26.9124", lng: "75.7873" },
  "Austin": { name: "Lucknow", lat: "26.8467", lng: "80.9462" },
  "Phoenix": { name: "Surat", lat: "21.1702", lng: "72.8311" },
  "Portland": { name: "Chandigarh", lat: "30.7333", lng: "76.7794" }
};

// Indian street names for addresses
const indianStreets = [
  "MG Road", "Park Street", "Brigade Road", "Marine Drive", "Linking Road",
  "Residency Road", "Infantry Road", "Anna Salai", "Nehru Place", "Connaught Place",
  "Bandra West", "Koramangala", "Jubilee Hills", "Salt Lake", "Satellite Road",
  "Ashok Nagar", "Rajajinagar", "Indiranagar", "Whitefield", "Electronic City",
  "Hitech City", "Sector 17", "Cyber City", "Golf Course Road", "Civil Lines"
];

async function updateCitiesToIndian() {
  try {
    console.log("Fetching all properties...");
    
    const allPosts = await prisma.post.findMany();
    
    console.log(`Found ${allPosts.length} properties to update.\n`);

    let updated = 0;
    
    for (const post of allPosts) {
      const currentCity = post.city;
      const mapping = cityMapping[currentCity];
      
      if (mapping) {
        // Generate a random Indian street address
        const randomStreet = indianStreets[Math.floor(Math.random() * indianStreets.length)];
        const houseNumber = Math.floor(Math.random() * 999) + 1;
        const newAddress = `${houseNumber} ${randomStreet}`;
        
        await prisma.post.update({
          where: { id: post.id },
          data: {
            city: mapping.name,
            address: newAddress,
            latitude: mapping.lat,
            longitude: mapping.lng
          }
        });
        
        console.log(`✓ Updated: "${post.title}" - ${currentCity} → ${mapping.name} (${newAddress})`);
        updated++;
      } else {
        console.log(`○ Kept: "${post.title}" - ${currentCity} (no mapping found)`);
      }
    }

    console.log(`\n✓ Successfully updated ${updated} properties to Indian cities!`);
    console.log(`○ Kept ${allPosts.length - updated} properties with their original cities.`);

  } catch (error) {
    console.error("Error updating cities:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCitiesToIndian();
