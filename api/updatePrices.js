import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updatePrices() {
  try {
    console.log("Fetching all properties...\n");
    
    const allPosts = await prisma.post.findMany();
    
    console.log(`Found ${allPosts.length} properties to check.\n`);

    let updated = 0;
    
    for (const post of allPosts) {
      // If price is less than 1,500,000, update it
      if (post.price < 1500000) {
        let newPrice;
        
        // For rental properties (prices typically under 10000), convert to reasonable rental
        if (post.type === 'rent' && post.price < 20000) {
          // Generate rental price between 25,000 to 150,000 per month
          newPrice = Math.floor(Math.random() * (150000 - 25000 + 1)) + 25000;
        } else {
          // For buy properties, generate price between 1.5M to 8M
          // Base it on bedrooms for some logic
          const basePrice = 1500000;
          const multiplier = post.bedroom || 2;
          newPrice = basePrice + (Math.floor(Math.random() * 2000000) * multiplier);
        }
        
        await prisma.post.update({
          where: { id: post.id },
          data: { price: newPrice }
        });
        
        console.log(`✓ Updated: "${post.title}"`);
        console.log(`  Old Price: ₹${post.price.toLocaleString()} → New Price: ₹${newPrice.toLocaleString()}`);
        console.log(`  Type: ${post.type}, Bedrooms: ${post.bedroom}\n`);
        updated++;
      } else {
        console.log(`○ Kept: "${post.title}" - ₹${post.price.toLocaleString()}`);
      }
    }

    console.log(`\n✅ Successfully updated ${updated} properties!`);
    console.log(`○ ${allPosts.length - updated} properties already had prices above ₹1,500,000.`);

  } catch (error) {
    console.error("Error updating prices:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePrices();
