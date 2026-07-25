import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:5173"],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.character.create({
            data: {
              userId: user.id,
              name: user.name ?? "Aventureiro",
            },
          });
        },
      },
    },
  },
});
