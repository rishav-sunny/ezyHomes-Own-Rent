import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixRishavHome() {
  try {
    const post = await prisma.post.findFirst({
      where: {
        title: "Rishav Home"
      }
    });

    if (post) {
      console.log("Found Rishav Home post:");
      console.log(`City: ${post.city}`);
      console.log(`State: ${post.state}`);
      
      await prisma.post.update({
        where: { id: post.id },
        data: { 
          state: "Kerala",
          city: "Kochi"
        }
      });
      
      console.log("\n✅ Updated Rishav Home with state: Kerala");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fixRishavHome();
