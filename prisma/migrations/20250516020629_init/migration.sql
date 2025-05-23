/*
  Warnings:

  - You are about to drop the `packages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "packages";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "paket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL
);
