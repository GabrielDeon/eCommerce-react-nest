/*
  Warnings:

  - Added the required column `additional_info` to the `tb_bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_at_addition` to the `tb_bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_bill" ADD COLUMN     "additional_info" VARCHAR(250) NOT NULL,
ADD COLUMN     "price_at_addition" DECIMAL(12,2) NOT NULL;
