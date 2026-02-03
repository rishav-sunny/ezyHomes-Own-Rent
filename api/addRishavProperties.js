import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addPropertiesForRishav() {
  try {
    // First, find the user with username "rishav"
    console.log("Finding user 'rishav'...");
    const user = await prisma.user.findUnique({
      where: { username: "rishav" }
    });

    if (!user) {
      console.error("User 'rishav' not found!");
      return;
    }

    console.log(`Found user: ${user.username} (ID: ${user.id})`);

    // Array of 20 diverse properties
    const properties = [
      {
        title: "Luxury Beachfront Villa",
        price: 4500000,
        images: [
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
        ],
        address: "123 Ocean Drive",
        city: "Miami",
        bedroom: 5,
        bathroom: 4,
        latitude: "25.7617",
        longitude: "-80.1918",
        type: "buy",
        property: "house",
        description: "Stunning beachfront villa with panoramic ocean views, infinity pool, and private beach access. Modern architecture with high-end finishes throughout.",
        utilities: "Included",
        pet: "Allowed",
        income: "Required: $200,000+",
        size: 4500,
        school: 800,
        bus: 200,
        restaurant: 300
      },
      {
        title: "Modern Downtown Penthouse",
        price: 3200000,
        images: [
          "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        address: "789 Sky Tower, 45th Floor",
        city: "New York",
        bedroom: 3,
        bathroom: 3,
        latitude: "40.7128",
        longitude: "-74.0060",
        type: "buy",
        property: "apartment",
        description: "Luxurious penthouse with floor-to-ceiling windows offering breathtaking city views. Features include a private terrace, chef's kitchen, and smart home technology.",
        utilities: "Included",
        pet: "Not Allowed",
        income: "Required: $180,000+",
        size: 2800,
        school: 500,
        bus: 100,
        restaurant: 50
      },
      {
        title: "Charming Victorian House",
        price: 1850000,
        images: [
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800"
        ],
        address: "456 Heritage Lane",
        city: "San Francisco",
        bedroom: 4,
        bathroom: 3,
        latitude: "37.7749",
        longitude: "-122.4194",
        type: "buy",
        property: "house",
        description: "Beautifully restored Victorian home with original architectural details, hardwood floors, and modern amenities. Located in a historic neighborhood.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $120,000+",
        size: 3200,
        school: 300,
        bus: 150,
        restaurant: 200
      },
      {
        title: "Cozy Mountain Cabin Retreat",
        price: 750000,
        images: [
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
          "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800"
        ],
        address: "1200 Pine Ridge Road",
        city: "Denver",
        bedroom: 3,
        bathroom: 2,
        latitude: "39.7392",
        longitude: "-104.9903",
        type: "buy",
        property: "house",
        description: "Peaceful mountain cabin surrounded by nature. Perfect weekend getaway with wood-burning fireplace, deck with mountain views, and hiking trails nearby.",
        utilities: "Included",
        pet: "Allowed",
        income: "Required: $60,000+",
        size: 1800,
        school: 5000,
        bus: 3000,
        restaurant: 2000
      },
      {
        title: "Contemporary Loft Apartment",
        price: 2800,
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
        ],
        address: "321 Arts District",
        city: "Los Angeles",
        bedroom: 2,
        bathroom: 2,
        latitude: "34.0522",
        longitude: "-118.2437",
        type: "rent",
        property: "apartment",
        description: "Trendy loft in the heart of the arts district. High ceilings, exposed brick, industrial finishes, and walking distance to galleries and restaurants.",
        utilities: "Not Included",
        pet: "Allowed",
        income: "Required: $8,500+",
        size: 1400,
        school: 600,
        bus: 100,
        restaurant: 50
      },
      {
        title: "Elegant Suburban Estate",
        price: 2950000,
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
        ],
        address: "888 Manor Drive",
        city: "Chicago",
        bedroom: 6,
        bathroom: 5,
        latitude: "41.8781",
        longitude: "-87.6298",
        type: "buy",
        property: "house",
        description: "Grand estate on 2 acres with gourmet kitchen, home theater, wine cellar, and 4-car garage. Manicured gardens and swimming pool.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $175,000+",
        size: 5500,
        school: 400,
        bus: 600,
        restaurant: 800
      },
      {
        title: "Stylish Studio Downtown",
        price: 1600,
        images: [
          "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"
        ],
        address: "555 Main Street, Unit 12",
        city: "Seattle",
        bedroom: 1,
        bathroom: 1,
        latitude: "47.6062",
        longitude: "-122.3321",
        type: "rent",
        property: "apartment",
        description: "Efficient studio with modern design, murphy bed, and city views. Perfect for young professionals. Close to public transit and coffee shops.",
        utilities: "Included",
        pet: "Not Allowed",
        income: "Required: $4,800+",
        size: 550,
        school: 400,
        bus: 50,
        restaurant: 100
      },
      {
        title: "Waterfront Condo Paradise",
        price: 1950000,
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800"
        ],
        address: "777 Harbor View",
        city: "San Diego",
        bedroom: 3,
        bathroom: 3,
        latitude: "32.7157",
        longitude: "-117.1611",
        type: "buy",
        property: "condo",
        description: "Spectacular waterfront condo with private boat slip. Open floor plan, gourmet kitchen, and resort-style amenities including pool and fitness center.",
        utilities: "Included",
        pet: "Allowed",
        income: "Required: $130,000+",
        size: 2200,
        school: 1000,
        bus: 300,
        restaurant: 200
      },
      {
        title: "Historic Brownstone Beauty",
        price: 3500000,
        images: [
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        address: "234 Park Avenue",
        city: "Boston",
        bedroom: 5,
        bathroom: 4,
        latitude: "42.3601",
        longitude: "-71.0589",
        type: "buy",
        property: "house",
        description: "Meticulously maintained brownstone with original details. Private garden, updated kitchen, and finished basement. Prime location near parks and shops.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $210,000+",
        size: 4000,
        school: 200,
        bus: 100,
        restaurant: 150
      },
      {
        title: "Modern Farmhouse on Acreage",
        price: 1250000,
        images: [
          "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800",
          "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800"
        ],
        address: "999 Country Road",
        city: "Austin",
        bedroom: 4,
        bathroom: 3,
        latitude: "30.2672",
        longitude: "-97.7431",
        type: "buy",
        property: "house",
        description: "Contemporary farmhouse on 5 acres with barn, pasture, and creek. Vaulted ceilings, wrap-around porch, and stunning hill country views.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $90,000+",
        size: 3500,
        school: 8000,
        bus: 10000,
        restaurant: 7000
      },
      {
        title: "Luxury High-Rise Apartment",
        price: 4200,
        images: [
          "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"
        ],
        address: "101 Skyline Tower, 32nd Floor",
        city: "Miami",
        bedroom: 2,
        bathroom: 2,
        latitude: "25.7617",
        longitude: "-80.1918",
        type: "rent",
        property: "apartment",
        description: "Premium apartment with stunning bay views. Luxury building amenities include rooftop pool, spa, gym, and 24-hour concierge service.",
        utilities: "Not Included",
        pet: "Allowed",
        income: "Required: $12,600+",
        size: 1600,
        school: 900,
        bus: 200,
        restaurant: 100
      },
      {
        title: "Rustic Ranch Home",
        price: 890000,
        images: [
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
        ],
        address: "1500 Prairie Lane",
        city: "Phoenix",
        bedroom: 4,
        bathroom: 3,
        latitude: "33.4484",
        longitude: "-112.0740",
        type: "buy",
        property: "house",
        description: "Southwest-style ranch home with desert landscaping. Spacious rooms, covered patio, and mountain views. RV parking and workshop.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $70,000+",
        size: 2800,
        school: 3000,
        bus: 4000,
        restaurant: 2500
      },
      {
        title: "Urban Industrial Loft",
        price: 3100,
        images: [
          "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
        ],
        address: "678 Warehouse District",
        city: "Portland",
        bedroom: 2,
        bathroom: 2,
        latitude: "45.5152",
        longitude: "-122.6784",
        type: "rent",
        property: "apartment",
        description: "Converted warehouse loft with original timber beams, polished concrete floors, and oversized windows. Steps from trendy restaurants and shops.",
        utilities: "Included",
        pet: "Allowed",
        income: "Required: $9,300+",
        size: 1700,
        school: 700,
        bus: 150,
        restaurant: 100
      },
      {
        title: "Mediterranean Villa Paradise",
        price: 5200000,
        images: [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800"
        ],
        address: "2000 Coastal Highway",
        city: "Los Angeles",
        bedroom: 7,
        bathroom: 6,
        latitude: "34.0522",
        longitude: "-118.2437",
        type: "buy",
        property: "house",
        description: "Spectacular Mediterranean estate with ocean views. Features include chef's kitchen, home theater, gym, wine cellar, infinity pool, and guest house.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $300,000+",
        size: 7200,
        school: 1500,
        bus: 1000,
        restaurant: 500
      },
      {
        title: "Cozy Townhouse Near Parks",
        price: 2400,
        images: [
          "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800",
          "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800"
        ],
        address: "432 Maple Avenue",
        city: "Denver",
        bedroom: 3,
        bathroom: 2,
        latitude: "39.7392",
        longitude: "-104.9903",
        type: "rent",
        property: "house",
        description: "Family-friendly townhouse in quiet neighborhood. Updated kitchen, fenced backyard, attached garage. Close to schools and parks.",
        utilities: "Not Included",
        pet: "Allowed",
        income: "Required: $7,200+",
        size: 1900,
        school: 300,
        bus: 400,
        restaurant: 600
      },
      {
        title: "Sleek Modern Condo",
        price: 975000,
        images: [
          "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800",
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800"
        ],
        address: "888 Innovation Drive",
        city: "San Francisco",
        bedroom: 2,
        bathroom: 2,
        latitude: "37.7749",
        longitude: "-122.4194",
        type: "buy",
        property: "condo",
        description: "Contemporary condo with designer finishes, European appliances, and smart home features. Building includes gym, lounge, and rooftop deck.",
        utilities: "Included",
        pet: "Not Allowed",
        income: "Required: $85,000+",
        size: 1300,
        school: 400,
        bus: 100,
        restaurant: 200
      },
      {
        title: "Spacious Family Home",
        price: 1450000,
        images: [
          "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
          "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800"
        ],
        address: "1111 Oak Tree Lane",
        city: "Seattle",
        bedroom: 5,
        bathroom: 4,
        latitude: "47.6062",
        longitude: "-122.3321",
        type: "buy",
        property: "house",
        description: "Perfect family home with open floor plan, large kitchen, bonus room, and private backyard. Excellent schools and community amenities.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $110,000+",
        size: 3800,
        school: 500,
        bus: 300,
        restaurant: 700
      },
      {
        title: "Lakefront Cottage Getaway",
        price: 650000,
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
          "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800"
        ],
        address: "555 Lakeshore Drive",
        city: "Chicago",
        bedroom: 2,
        bathroom: 2,
        latitude: "41.8781",
        longitude: "-87.6298",
        type: "buy",
        property: "house",
        description: "Charming lakefront cottage with private dock, screened porch, and sunset views. Recently renovated with modern conveniences while maintaining character.",
        utilities: "Included",
        pet: "Allowed",
        income: "Required: $55,000+",
        size: 1400,
        school: 6000,
        bus: 5000,
        restaurant: 4000
      },
      {
        title: "Executive Penthouse Suite",
        price: 6800,
        images: [
          "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800"
        ],
        address: "999 Prestige Tower, 50th Floor",
        city: "New York",
        bedroom: 4,
        bathroom: 4,
        latitude: "40.7128",
        longitude: "-74.0060",
        type: "rent",
        property: "apartment",
        description: "Ultra-luxury penthouse with wraparound terrace and 360-degree city views. Features include marble bathrooms, chef's kitchen, and private elevator access.",
        utilities: "Included",
        pet: "Allowed",
        income: "Required: $20,400+",
        size: 3500,
        school: 300,
        bus: 50,
        restaurant: 25
      },
      {
        title: "Desert Oasis Villa",
        price: 1780000,
        images: [
          "https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=800",
          "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800"
        ],
        address: "1234 Sunset Canyon",
        city: "Phoenix",
        bedroom: 4,
        bathroom: 3,
        latitude: "33.4484",
        longitude: "-112.0740",
        type: "buy",
        property: "house",
        description: "Modern desert retreat with glass walls, resort-style pool, outdoor kitchen, and stunning mountain views. Low-maintenance xeriscaping and solar panels.",
        utilities: "Tenant Responsibility",
        pet: "Allowed",
        income: "Required: $125,000+",
        size: 3600,
        school: 2000,
        bus: 3000,
        restaurant: 1500
      }
    ];

    console.log(`\nCreating ${properties.length} properties for user ${user.username}...`);

    let created = 0;
    for (const prop of properties) {
      // Create the post with postDetail in a transaction
      const post = await prisma.post.create({
        data: {
          title: prop.title,
          price: prop.price,
          images: prop.images,
          address: prop.address,
          city: prop.city,
          bedroom: prop.bedroom,
          bathroom: prop.bathroom,
          latitude: prop.latitude,
          longitude: prop.longitude,
          type: prop.type,
          property: prop.property,
          userId: user.id,
          postDetail: {
            create: {
              description: prop.description,
              utilities: prop.utilities,
              pet: prop.pet,
              income: prop.income,
              size: prop.size,
              school: prop.school,
              bus: prop.bus,
              restaurant: prop.restaurant
            }
          }
        },
        include: {
          postDetail: true
        }
      });

      created++;
      console.log(`✓ Created: ${post.title} (${post.city}) - $${post.price.toLocaleString()}`);
    }

    console.log(`\n✓ Successfully created ${created} properties for user ${user.username}!`);
    console.log(`All properties are now accessible for editing and deletion by user ${user.username}.`);

  } catch (error) {
    console.error("Error adding properties:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addPropertiesForRishav();
