-- CreateTable
CREATE TABLE "points" (
    "point_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "points_pkey" PRIMARY KEY ("point_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "points_user_id_key" ON "points"("user_id");
