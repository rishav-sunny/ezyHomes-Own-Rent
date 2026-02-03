import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixMissingStates() {
  try {
    console.log("Checking for posts without state...\n");
    
    const postsWithoutState = await prisma.post.findMany({
      where: {
        OR: [
          { state: null },
          { state: "" },
          { state: "No State" }
        ]
      }
    });

    console.log(`Found ${postsWithoutState.length} posts needing state updates\n`);

    // Indian cities with their states
    const cityStateMap = {
      "Mumbai": "Maharashtra",
      "Delhi": "Delhi",
      "Bangalore": "Karnataka",
      "Pune": "Maharashtra",
      "Hyderabad": "Telangana",
      "Chennai": "Tamil Nadu",
      "Kolkata": "West Bengal",
      "Ahmedabad": "Gujarat",
      "Jaipur": "Rajasthan",
      "Lucknow": "Uttar Pradesh",
      "Surat": "Gujarat",
      "Chandigarh": "Chandigarh",
      "Ernakulam": "Kerala",
      "Kochi": "Kerala",
      "KOCHI": "Kerala",
      "kochi": "Kerala",
      "Patna": "Bihar",
      "Ghaziabad": "Uttar Pradesh",
      "Noida": "Uttar Pradesh",
      "Kanpur": "Uttar Pradesh",
      "Raipur": "Chhattisgarh",
      "Trivandrum": "Kerala",
      "Bihar": "Bihar",
      "New Delhi": "Delhi",
      "Hitech City": "Telangana",
      "Gaya": "Bihar",
      "Pawapuri": "Bihar",
      "Rohtas": "Bihar",
      "Kerala": "Kerala",
      "Maharashtra": "Maharashtra",
      "Jharkhand": "Jharkhand"
    };

    for (const post of postsWithoutState) {
      const state = cityStateMap[post.city] || "Maharashtra"; // Default to Maharashtra if not found
      
      await prisma.post.update({
        where: { id: post.id },
        data: { state: state }
      });
      
      console.log(`✓ Updated "${post.title}" - ${post.city} → ${state}`);
    }

    console.log(`\n✅ All posts now have state field!`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixMissingStates();
