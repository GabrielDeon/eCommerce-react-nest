/*
  Warnings:

  - You are about to drop the column `price_at_addition` on the `tb_bill` table. All the data in the column will be lost.
  - Added the required column `final_price` to the `tb_bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_bill" DROP COLUMN "price_at_addition",
ADD COLUMN     "final_price" DECIMAL(12,2) NOT NULL;
