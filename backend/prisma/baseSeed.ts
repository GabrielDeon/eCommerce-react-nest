import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const prisma = new PrismaClient();

async function main() {
  const categories = ['Books', 'Clothing', 'Chairs', 'Tables'];
  const sizes = [
    { size_name: 'No_Size', id: '00000000-0000-0000-0000-000000000001' },
  ];

  const colors = [
    {
      id: '00000000-0000-0000-0000-000000000002',
      color_name: 'No_Color',
      color_code: 'NO_COLOR',
    },
  ];

  for (const category of categories) {
    await prisma.tb_category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category,
      },
    });
  }

  for (const size of sizes) {
    await prisma.tb_size.upsert({
      where: { size_name: size.size_name },
      update: {},
      create: {
        id: size.id || uuidv4(),
        size_name: size.size_name,
      },
    });
  }

  for (const color of colors) {
    await prisma.tb_color.upsert({
      where: { color_name: color.color_name },
      update: {},
      create: {
        id: color.id || uuidv4(),
        color_name: color.color_name,
        color_code: color.color_code,
        deleted_at: null,
      },
    });
  }

  console.log('Database has been seeded with base files.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
