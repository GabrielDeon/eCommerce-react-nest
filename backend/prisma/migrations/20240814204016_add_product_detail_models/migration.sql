-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "tb_user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_category" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_size" (
    "id" TEXT NOT NULL,
    "size_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "tb_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_color" (
    "id" TEXT NOT NULL,
    "color_name" TEXT NOT NULL,
    "color_code" TEXT NOT NULL,

    CONSTRAINT "tb_color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product" (
    "id" TEXT NOT NULL,
    "id_category" TEXT NOT NULL,
    "product_name" VARCHAR(100) NOT NULL,
    "short_description" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "base_price" DECIMAL(12,2) NOT NULL,
    "discount_percentage" DECIMAL(5,2),
    "final_price" DECIMAL(12,2) NOT NULL,
    "tags" VARCHAR(30) NOT NULL,
    "image_1" VARCHAR(255) NOT NULL,
    "image_2" VARCHAR(255),
    "image_3" VARCHAR(255),
    "image_4" VARCHAR(255),
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_product_variation" (
    "id" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "id_size" TEXT,
    "id_color" TEXT,
    "quantity" INTEGER NOT NULL,
    "SKU" VARCHAR(5) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_product_variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_reviews" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "review_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_category_name_key" ON "tb_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_size_size_name_key" ON "tb_size"("size_name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_color_color_name_key" ON "tb_color"("color_name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_product_name_key" ON "tb_product"("product_name");

-- CreateIndex
CREATE INDEX "tb_product_id_idx" ON "tb_product"("id");

-- CreateIndex
CREATE INDEX "tb_product_product_name_idx" ON "tb_product"("product_name");

-- CreateIndex
CREATE INDEX "tb_product_base_price_idx" ON "tb_product"("base_price");

-- CreateIndex
CREATE INDEX "tb_product_final_price_idx" ON "tb_product"("final_price");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_variation_SKU_key" ON "tb_product_variation"("SKU");

-- CreateIndex
CREATE INDEX "tb_product_variation_id_product_idx" ON "tb_product_variation"("id_product");

-- CreateIndex
CREATE INDEX "tb_product_variation_id_size_idx" ON "tb_product_variation"("id_size");

-- CreateIndex
CREATE INDEX "tb_product_variation_id_color_idx" ON "tb_product_variation"("id_color");

-- CreateIndex
CREATE UNIQUE INDEX "tb_product_variation_id_product_id_size_id_color_key" ON "tb_product_variation"("id_product", "id_size", "id_color");

-- CreateIndex
CREATE INDEX "tb_reviews_id_product_idx" ON "tb_reviews"("id_product");

-- CreateIndex
CREATE UNIQUE INDEX "tb_reviews_id_user_id_product_key" ON "tb_reviews"("id_user", "id_product");

-- AddForeignKey
ALTER TABLE "tb_product" ADD CONSTRAINT "tb_product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "tb_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_product_variation" ADD CONSTRAINT "tb_product_variation_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "tb_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_product_variation" ADD CONSTRAINT "tb_product_variation_id_size_fkey" FOREIGN KEY ("id_size") REFERENCES "tb_size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_product_variation" ADD CONSTRAINT "tb_product_variation_id_color_fkey" FOREIGN KEY ("id_color") REFERENCES "tb_color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_reviews" ADD CONSTRAINT "tb_reviews_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_reviews" ADD CONSTRAINT "tb_reviews_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "tb_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
