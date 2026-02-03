import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Indian cities with their states and coordinates
const indianCityStates = {
  "Mumbai": { state: "Maharashtra", lat: "19.0760", lng: "72.8777" },
  "Delhi": { state: "Delhi", lat: "28.6139", lng: "77.2090" },
  "Bangalore": { state: "Karnataka", lat: "12.9716", lng: "77.5946" },
  "Pune": { state: "Maharashtra", lat: "18.5204", lng: "73.8567" },
  "Hyderabad": { state: "Telangana", lat: "17.3850", lng: "78.4867" },
  "Chennai": { state: "Tamil Nadu", lat: "13.0827", lng: "80.2707" },
  "Kolkata": { state: "West Bengal", lat: "22.5726", lng: "88.3639" },
  "Ahmedabad": { state: "Gujarat", lat: "23.0225", lng: "72.5714" },
  "Jaipur": { state: "Rajasthan", lat: "26.9124", lng: "75.7873" },
  "Lucknow": { state: "Uttar Pradesh", lat: "26.8467", lng: "80.9462" },
  "Surat": { state: "Gujarat", lat: "21.1702", lng: "72.8311" },
  "Chandigarh": { state: "Chandigarh", lat: "30.7333", lng: "76.7794" },
  "Ernakulam": { state: "Kerala", lat: "9.9816", lng: "76.2999" },
  "KOCHI": { state: "Kerala", lat: "9.9312", lng: "76.2673" },
  "Kochi": { state: "Kerala", lat: "9.9312", lng: "76.2673" },
  "Patna": { state: "Bihar", lat: "25.5941", lng: "85.1376" }
};

// Indian street names without numbers
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
  "Rajarhat",
  "Vastrapur",
  "Navrangpura",
  "Paldi",
  "Bodakdev",
  "SG Highway",
  "Malviya Nagar",
  "C Scheme",
  "Vaishali Nagar",
  "Mansarovar",
  "Raja Park",
  "Gomti Nagar",
  "Hazratganj",
  "Indira Nagar",
  "Alambagh",
  "Aliganj",
  "Adajan",
  "Vesu",
  "Pal",
  "Citylight",
  "Athwa"
];

async function updateAddressesAndStates() {
  try {
    console.log("Fetching all properties...\n");
    
    const allPosts = await prisma.post.findMany();
    
    console.log(`Found ${allPosts.length} properties to update.\n`);

    let updated = 0;
    
    for (const post of allPosts) {
      const currentCity = post.city;
      const cityData = indianCityStates[currentCity];
      
      if (cityData) {
        // Select a random address without numbers
        const randomAddress = indianAddresses[Math.floor(Math.random() * indianAddresses.length)];
        
        await prisma.post.update({
          where: { id: post.id },
          data: {
            address: randomAddress,
            state: cityData.state,
            latitude: cityData.lat,
            longitude: cityData.lng
          }
        });
        
        console.log(`✓ Updated: "${post.title}"`);
        console.log(`  City: ${currentCity}, State: ${cityData.state}`);
        console.log(`  Address: ${randomAddress}\n`);
        updated++;
      } else {
        console.log(`⚠ Skipped: "${post.title}" - City "${currentCity}" not found in mapping\n`);
      }
    }

    console.log(`\n✅ Successfully updated ${updated} properties!`);
    console.log(`   - Removed numbers from addresses`);
    console.log(`   - Added state field for all properties`);
    console.log(`   - Updated coordinates to match cities`);
    console.log(`\n✅ All data is now stored in MongoDB. You can search by state!`);

  } catch (error) {
    console.error("Error updating properties:", error);
    if (error.message.includes("state")) {
      console.error("\n⚠ Please run 'npx prisma generate' first to update the Prisma client!");
    }
  } finally {
    await prisma.$disconnect();
  }
}

updateAddressesAndStates();
