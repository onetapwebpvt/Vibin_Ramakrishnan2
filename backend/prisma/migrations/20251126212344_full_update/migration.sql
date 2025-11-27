-- DropIndex
DROP INDEX "Patent_order_idx";

-- AlterTable
ALTER TABLE "Patent" ADD COLUMN     "date" TEXT,
ADD COLUMN     "patentType" TEXT NOT NULL DEFAULT 'Indian';

-- CreateTable
CREATE TABLE "LabProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabCarouselImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabCarouselImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabProject" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhdStudent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "field" TEXT NOT NULL,
    "photo" TEXT,
    "isAlumni" BOOLEAN NOT NULL DEFAULT false,
    "presentPosition" TEXT,
    "note" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhdStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MtechStudent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MtechStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BtechStudent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BtechStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "isbn" TEXT,
    "publisher" TEXT NOT NULL,
    "year" TEXT,
    "links" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookChapter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "year" TEXT,
    "isbn" TEXT,
    "doi" TEXT,
    "refNumber" INTEGER,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookChapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComputationalTool" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "url" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComputationalTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outreach" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Outreach_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabCarouselImage_order_idx" ON "LabCarouselImage"("order");

-- CreateIndex
CREATE INDEX "LabProject_order_idx" ON "LabProject"("order");

-- CreateIndex
CREATE INDEX "PhdStudent_isAlumni_order_idx" ON "PhdStudent"("isAlumni", "order");

-- CreateIndex
CREATE INDEX "MtechStudent_order_idx" ON "MtechStudent"("order");

-- CreateIndex
CREATE INDEX "BtechStudent_order_idx" ON "BtechStudent"("order");

-- CreateIndex
CREATE INDEX "Book_order_idx" ON "Book"("order");

-- CreateIndex
CREATE INDEX "BookChapter_order_idx" ON "BookChapter"("order");

-- CreateIndex
CREATE INDEX "ComputationalTool_order_idx" ON "ComputationalTool"("order");

-- CreateIndex
CREATE INDEX "Outreach_order_idx" ON "Outreach"("order");

-- CreateIndex
CREATE INDEX "Patent_patentType_order_idx" ON "Patent"("patentType", "order");
