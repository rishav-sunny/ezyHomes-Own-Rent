import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

// Test database connection
prisma.$connect()
  .then(() => console.log('✅ Prisma connected to database successfully'))
  .catch((err) => console.error('❌ Prisma connection failed:', err.message));

export default prisma;