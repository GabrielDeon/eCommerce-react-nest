/*
  Warnings:

  - You are about to drop the column `quantity` on the `tb_product_variation` table. All the data in the column will be lost.
  - Added the required column `base_price` to the `tb_product_variation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_price` to the `tb_product_variation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `tb_product_variation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_product_variation" DROP COLUMN "quantity",
ADD COLUMN     "base_price" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "discount_percentage" DECIMAL(5,2) DEFAULT 0,
ADD COLUMN     "final_price" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "tb_product_variation_final_price_idx" ON "tb_product_variation"("final_price");
