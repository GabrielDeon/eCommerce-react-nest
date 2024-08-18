/*
  Warnings:

  - You are about to drop the `tb_reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_reviews" DROP CONSTRAINT "tb_reviews_id_product_fkey";

-- DropForeignKey
ALTER TABLE "tb_reviews" DROP CONSTRAINT "tb_reviews_id_user_fkey";

-- DropTable
DROP TABLE "tb_reviews";

-- CreateTable
CREATE TABLE "tb_review" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "review_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tb_review_id_product_idx" ON "tb_review"("id_product");

-- CreateIndex
CREATE UNIQUE INDEX "tb_review_id_user_id_product_key" ON "tb_review"("id_user", "id_product");

-- AddForeignKey
ALTER TABLE "tb_review" ADD CONSTRAINT "tb_review_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_review" ADD CONSTRAINT "tb_review_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "tb_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
