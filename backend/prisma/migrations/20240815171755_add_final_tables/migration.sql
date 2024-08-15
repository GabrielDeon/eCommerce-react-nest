/*
  Warnings:

  - You are about to alter the column `color_name` on the `tb_color` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(45)`.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'CHECKEDOUT', 'ABANDONED');

-- AlterTable
ALTER TABLE "tb_color" ALTER COLUMN "color_name" SET DATA TYPE VARCHAR(45);

-- CreateTable
CREATE TABLE "tb_cart" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,

    CONSTRAINT "tb_cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cart_item" (
    "id" TEXT NOT NULL,
    "id_cart" TEXT NOT NULL,
    "id_product_variation" TEXT NOT NULL,

    CONSTRAINT "tb_cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_bill" (
    "id" TEXT NOT NULL,
    "id_cart" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "company_name" VARCHAR(100),
    "zip_code" VARCHAR(20) NOT NULL,
    "country_region" VARCHAR(100) NOT NULL,
    "street_address" VARCHAR(255) NOT NULL,
    "city_town" VARCHAR(100) NOT NULL,
    "province" VARCHAR(100) NOT NULL,
    "address_line_2" VARCHAR(255),
    "email_address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tb_cart_id_user_idx" ON "tb_cart"("id_user");

-- CreateIndex
CREATE INDEX "tb_cart_item_id_cart_idx" ON "tb_cart_item"("id_cart");

-- CreateIndex
CREATE INDEX "tb_bill_id_user_idx" ON "tb_bill"("id_user");

-- CreateIndex
CREATE INDEX "tb_bill_id_cart_idx" ON "tb_bill"("id_cart");

-- AddForeignKey
ALTER TABLE "tb_cart" ADD CONSTRAINT "tb_cart_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart_item" ADD CONSTRAINT "tb_cart_item_id_cart_fkey" FOREIGN KEY ("id_cart") REFERENCES "tb_cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cart_item" ADD CONSTRAINT "tb_cart_item_id_product_variation_fkey" FOREIGN KEY ("id_product_variation") REFERENCES "tb_product_variation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_bill" ADD CONSTRAINT "tb_bill_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_bill" ADD CONSTRAINT "tb_bill_id_cart_fkey" FOREIGN KEY ("id_cart") REFERENCES "tb_cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
