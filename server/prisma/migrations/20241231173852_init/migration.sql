-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_records" (
    "id" TEXT NOT NULL,
    "end_year" TEXT NOT NULL,
    "intensity" INTEGER NOT NULL,
    "sector" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "insight" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "start_year" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "added" TEXT NOT NULL,
    "published" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "relevance" INTEGER NOT NULL,
    "pestle" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "likelihood" INTEGER NOT NULL,

    CONSTRAINT "data_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
