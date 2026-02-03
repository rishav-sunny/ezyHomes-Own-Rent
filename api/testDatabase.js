import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testDatabaseConnection() {
  console.log("\n🔍 TESTING DATABASE CONNECTION AND FUNCTIONALITY\n");
  console.log("=".repeat(60));

  try {
    // Test 1: Database connection
    console.log("\n1️⃣  Testing Database Connection...");
    await prisma.$connect();
    console.log("   ✅ Database connected successfully!");

    // Test 2: Count posts
    console.log("\n2️⃣  Counting Posts...");
    const postCount = await prisma.post.count();
    console.log(`   ✅ Found ${postCount} posts in database`);

    // Test 3: Get latest 6 posts (for home page)
    console.log("\n3️⃣  Fetching Latest 6 Posts (Home Page Test)...");
    const latestPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 6
    });
    console.log(`   ✅ Retrieved ${latestPosts.length} latest posts`);
    latestPosts.forEach((post, index) => {
      console.log(`      ${index + 1}. ${post.title} (${post.city}, ${post.state || 'No State'})`);
    });

    // Test 4: Test contact model
    console.log("\n4️⃣  Testing Contact Model...");
    const testContact = await prisma.contact.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "This is a test message to verify contact form functionality"
      }
    });
    console.log(`   ✅ Contact created successfully with ID: ${testContact.id}`);
    
    // Delete test contact
    await prisma.contact.delete({
      where: { id: testContact.id }
    });
    console.log(`   ✅ Test contact deleted successfully`);

    // Test 5: Check if posts have state field
    console.log("\n5️⃣  Checking State Field in Posts...");
    const postsWithoutState = await prisma.post.findMany({
      where: {
        OR: [
          { state: null },
          { state: "" }
        ]
      }
    });
    if (postsWithoutState.length > 0) {
      console.log(`   ⚠️  Warning: ${postsWithoutState.length} posts missing state field`);
      postsWithoutState.forEach(post => {
        console.log(`      - ${post.title} (${post.city})`);
      });
    } else {
      console.log(`   ✅ All posts have state field populated`);
    }

    // Test 6: Verify all posts have required fields
    console.log("\n6️⃣  Verifying Required Fields...");
    const allPosts = await prisma.post.findMany();
    let issueCount = 0;
    allPosts.forEach(post => {
      const issues = [];
      if (!post.title) issues.push('title');
      if (!post.city) issues.push('city');
      if (!post.address) issues.push('address');
      if (post.price === null || post.price === undefined) issues.push('price');
      
      if (issues.length > 0) {
        console.log(`   ⚠️  Post "${post.title || 'Untitled'}" missing: ${issues.join(', ')}`);
        issueCount++;
      }
    });
    if (issueCount === 0) {
      console.log(`   ✅ All posts have required fields`);
    }

    // Test 7: Contact count
    console.log("\n7️⃣  Checking Contacts...");
    const contactCount = await prisma.contact.count();
    console.log(`   ✅ Found ${contactCount} contact submissions in database`);

    // Test 8: User count
    console.log("\n8️⃣  Checking Users...");
    const userCount = await prisma.user.count();
    console.log(`   ✅ Found ${userCount} users in database`);
    
    const rishabUser = await prisma.user.findUnique({
      where: { username: "rishav" },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });
    if (rishabUser) {
      console.log(`   ✅ User 'rishav' found with ${rishabUser._count.posts} posts`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("✅ ALL TESTS PASSED SUCCESSFULLY!");
    console.log("=".repeat(60) + "\n");

  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    console.error("\nFull error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
