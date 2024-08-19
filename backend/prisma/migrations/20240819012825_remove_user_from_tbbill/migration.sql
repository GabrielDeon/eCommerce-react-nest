/*
  Warnings:

  - You are about to drop the column `id_user` on the `tb_bill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_bill" DROP CONSTRAINT "tb_bill_id_user_fkey";

-- DropIndex
DROP INDEX "tb_bill_id_user_idx";

-- AlterTable
ALTER TABLE "tb_bill" DROP COLUMN "id_user";
