-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('DIPINJAM', 'DIKEMBALIKAN', 'TERLAMBAT');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "peran" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Buku" (
    "buku_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "ISBN" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("buku_id")
);

-- CreateTable
CREATE TABLE "Peminjaman" (
    "id_peminjaman" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "buku_id" INTEGER NOT NULL,
    "tanggal_pinjam" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_dikembalikan" TIMESTAMP(3),
    "tanggal_kembali" TIMESTAMP(3) NOT NULL,
    "status" "LoanStatus" NOT NULL,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id_peminjaman")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_buku_id_fkey" FOREIGN KEY ("buku_id") REFERENCES "Buku"("buku_id") ON DELETE RESTRICT ON UPDATE CASCADE;
