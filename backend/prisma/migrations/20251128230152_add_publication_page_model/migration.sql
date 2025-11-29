-- CreateTable
CREATE TABLE "PublicationPage" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "doi" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicationPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PublicationPage_year_order_idx" ON "PublicationPage"("year", "order");
