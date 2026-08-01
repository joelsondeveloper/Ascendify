import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const items = [
    {
      type: "COSMETIC" as const,
      cosmeticKind: "PERMANENT" as const,
      title: "Caçador Iniciante",
      description: "Um título para quem está começando a jornada.",
      effectValue: "Caçador Iniciante",
      basePrice: 50,
    },
    {
      type: "COSMETIC" as const,
      cosmeticKind: "PERMANENT" as const,
      title: "Sombra Ascendente",
      description: "Um título para quem já provou sua consistência.",
      effectValue: "Sombra Ascendente",
      basePrice: 150,
    },
    {
      type: "COSMETIC" as const,
      cosmeticKind: "CONSUMABLE" as const,
      title: "Poção de Recuperação",
      description: "Protege um hábito de perder o streak no próximo período.",
      effectType: "STREAK_FREEZE",
      basePrice: 30,
    },
  ];

  for (const item of items) {
    const exists = await prisma.shopItem.findFirst({
      where: { title: item.title, characterId: null },
    });

    if (!exists) {
      await prisma.shopItem.create({ data: item });
      console.log(`Criado: ${item.title}`);
    } else {
      console.log(`Já existe, pulando: ${item.title}`);
    }
  }
}

main()
  .then(() => {
    console.log("Seed concluído.");
    return prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });