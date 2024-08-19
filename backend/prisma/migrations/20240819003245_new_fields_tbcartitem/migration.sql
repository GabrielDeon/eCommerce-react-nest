/*
  Warnings:

  - Added the required column `price_at_addition` to the `tb_cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `tb_cart_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_cart_item" ADD COLUMN     "price_at_addition" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
