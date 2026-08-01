-- CreateEnum
CREATE TYPE "ShopItemType" AS ENUM ('REAL_LIFE', 'COSMETIC');

-- CreateEnum
CREATE TYPE "CosmeticKind" AS ENUM ('PERMANENT', 'CONSUMABLE');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "hasActiveFreeze" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ShopItem" (
    "id" TEXT NOT NULL,
    "characterId" TEXT,
    "type" "ShopItemType" NOT NULL,
    "cosmeticKind" "CosmeticKind",
    "title" TEXT NOT NULL,
    "description" TEXT,
    "effectType" TEXT,
    "effectValue" TEXT,
    "basePrice" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardRedemption" (
    "id" TEXT NOT NULL,
    "shopItemId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "pricePaid" INTEGER NOT NULL,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RewardRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterInventoryItem" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "shopItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CharacterInventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterInventoryItem_characterId_shopItemId_key" ON "CharacterInventoryItem"("characterId", "shopItemId");

-- AddForeignKey
ALTER TABLE "ShopItem" ADD CONSTRAINT "ShopItem_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardRedemption" ADD CONSTRAINT "RewardRedemption_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterInventoryItem" ADD CONSTRAINT "CharacterInventoryItem_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterInventoryItem" ADD CONSTRAINT "CharacterInventoryItem_shopItemId_fkey" FOREIGN KEY ("shopItemId") REFERENCES "ShopItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
