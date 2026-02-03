import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateProperties() {
  try {
    // Image URLs from the uploaded images
    const snowVillaImage = "https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
    const riskuVillaImage = "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

    // Find and update Range Rover property
    console.log("Searching for Range Rover property...");
    const rangeRoverPosts = await prisma.post.findMany({
      where: {
        title: {
          contains: "Range Rover",
          mode: "insensitive"
        }
      }
    });

    if (rangeRoverPosts.length > 0) {
      for (const post of rangeRoverPosts) {
        console.log(`Found Range Rover property (ID: ${post.id})`);
        
        // Add the new image and rename
        const updatedImages = [...post.images, snowVillaImage];
        
        await prisma.post.update({
          where: { id: post.id },
          data: {
            title: "Snow Villa House",
            images: updatedImages
          }
        });
        
        console.log(`✓ Updated property to "Snow Villa House" and added image`);
      }
    } else {
      console.log("⚠ No property found with 'Range Rover' in title");
    }

    // Find and update Risku/Rishav Villa property
    console.log("\nSearching for Risku/Rishav Villa property...");
    const villaVariants = ["risku", "rishav", "villa"];
    
    const villaPosts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: "risku", mode: "insensitive" } },
          { title: { contains: "rishav", mode: "insensitive" } },
          { title: { contains: "Risku", mode: "insensitive" } },
          { title: { contains: "Rishav", mode: "insensitive" } }
        ]
      }
    });

    if (villaPosts.length > 0) {
      for (const post of villaPosts) {
        console.log(`Found villa property: "${post.title}" (ID: ${post.id})`);
        
        // Add the new image
        const updatedImages = [...post.images, riskuVillaImage];
        
        await prisma.post.update({
          where: { id: post.id },
          data: {
            images: updatedImages
          }
        });
        
        console.log(`✓ Added image to "${post.title}"`);
      }
    } else {
      console.log("⚠ No property found matching 'risku' or 'rishav' villa");
    }

    console.log("\n✓ Update completed successfully!");

  } catch (error) {
    console.error("Error updating properties:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProperties();
