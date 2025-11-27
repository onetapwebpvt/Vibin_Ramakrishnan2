-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" SERIAL NOT NULL,
    "logoUrl" TEXT,
    "siteName" TEXT NOT NULL DEFAULT 'Professor Portfolio',
    "footerName" TEXT,
    "footerTitle" TEXT,
    "footerEmail" TEXT,
    "footerPhone" TEXT,
    "footerOffice" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "googleScholarUrl" TEXT,
    "researchGateUrl" TEXT,
    "githubUrl" TEXT,
    "copyrightText" TEXT,
    "officialSiteUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
