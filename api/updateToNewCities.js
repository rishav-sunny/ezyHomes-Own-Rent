import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 25 Indian cities with their states and coordinates
const indianCities = [
  { name: "Delhi", state: "Delhi", lat: "28.6139", lng: "77.2090" },
  { name: "Mumbai", state: "Maharashtra", lat: "19.0760", lng: "72.8777" },
  { name: "Pune", state: "Maharashtra", lat: "18.5204", lng: "73.8567" },
  { name: "Kochi", state: "Kerala", lat: "9.9312", lng: "76.2673" },
  { name: "Kerala", state: "Kerala", lat: "10.8505", lng: "76.2711" },
  { name: "Maharashtra", state: "Maharashtra", lat: "19.7515", lng: "75.7139" },
  { name: "Kolkata", state: "West Bengal", lat: "22.5726", lng: "88.3639" },
  { name: "Patna", state: "Bihar", lat: "25.5941", lng: "85.1376" },
  { name: "Jharkhand", state: "Jharkhand", lat: "23.6102", lng: "85.2799" },
  { name: "Bangalore", state: "Karnataka", lat: "12.9716", lng: "77.5946" },
  { name: "Chennai", state: "Tamil Nadu", lat: "13.0827", lng: "80.2707" },
  { name: "Raipur", state: "Chhattisgarh", lat: "21.2514", lng: "81.6296" },
  { name: "Jaipur", state: "Rajasthan", lat: "26.9124", lng: "75.7873" },
  { name: "Hyderabad", state: "Telangana", lat: "17.3850", lng: "78.4867" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: "26.8467", lng: "80.9462" },
  { name: "Kanpur", state: "Uttar Pradesh", lat: "26.4499", lng: "80.3319" },
  { name: "Noida", state: "Uttar Pradesh", lat: "28.5355", lng: "77.3910" },
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: "28.6692", lng: "77.4538" },
  { name: "Trivandrum", state: "Kerala", lat: "8.5241", lng: "76.9366" },
  { name: "Bihar", state: "Bihar", lat: "25.0961", lng: "85.3131" },
  { name: "New Delhi", state: "Delhi", lat: "28.6139", lng: "77.2090" },
  { name: "Hitech City", state: "Telangana", lat: "17.4486", lng: "78.3908" },
  { name: "Gaya", state: "Bihar", lat: "24.7955", lng: "85.0002" },
  { name: "Pawapuri", state: "Bihar", lat: "25.0867", lng: "85.5900" },
  { name: "Rohtas", state: "Bihar", lat: "24.9570", lng: "84.0323" }
];

// Indian street names for addresses
const indianAddresses = [
  "MG Road",
  "Park Street",
  "Brigade Road",
  "Marine Drive",
  "Linking Road",
  "Residency Road",
  "Infantry Road",
  "Anna Salai",
  "Nehru Place",
  "Connaught Place",
  "Bandra West",
  "Koramangala",
  "Jubilee Hills",
  "Salt Lake City",
  "Satellite Road",
  "Ashok Nagar",
  "Rajajinagar",
  "Indiranagar",
  "Whitefield",
  "Electronic City",
  "Hitech City",
  "Sector 17",
  "Cyber City",
  "Golf Course Road",
  "Civil Lines",
  "Saket",
  "Vasant Vihar",
  "Defence Colony",
  "Greater Kailash",
  "Hauz Khas",
  "Powai",
  "Andheri West",
  "Vile Parle",
  "Santacruz",
  "Malabar Hill",
  "Jayanagar",
  "HSR Layout",
  "Ulsoor",
  "Richmond Town",
  "Frazer Town",
  "Banjara Hills",
  "Gachibowli",
  "Madhapur",
  "Begumpet",
  "Ameerpet",
  "Alwarpet",
  "T Nagar",
  "Mylapore",
  "Adyar",
  "Velachery",
  "Park Circus",
  "Ballygunge",
  "Alipore",
  "New Town",
  "Rajarhat"
];

async function updateAllPropertiesToNewCities() {
  try {
    console.log("Fetching all properties...\n");
    
    const allPosts = await prisma.post.findMany();
    
    console.log(`Found ${allPosts.length} properties to update.\n`);

    let updated = 0;
    
    for (const post of allPosts) {
      // Randomly select a city from the list
      const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
      
      // Randomly select an address
      const randomAddress = indianAddresses[Math.floor(Math.random() * indianAddresses.length)];
      
      await prisma.post.update({
        where: { id: post.id },
        data: {
          city: randomCity.name,
          state: randomCity.state,
          address: randomAddress,
          latitude: randomCity.lat,
          longitude: randomCity.lng
        }
      });
      
      console.log(`✓ Updated: "${post.title}"`);
      console.log(`  City: ${randomCity.name}, State: ${randomCity.state}`);
      console.log(`  Address: ${randomAddress}\n`);
      updated++;
    }

    console.log(`\n✅ Successfully updated ${updated} properties!`);
    console.log(`   - All properties now use the 25 specified Indian cities`);
    console.log(`   - All addresses updated with proper street names`);
    console.log(`   - All data saved in MongoDB`);

  } catch (error) {
    console.error("Error updating properties:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAllPropertiesToNewCities();
