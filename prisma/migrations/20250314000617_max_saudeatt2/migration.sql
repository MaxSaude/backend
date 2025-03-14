/*
  Warnings:

  - You are about to drop the column `nomeEmprepsa` on the `Agendamento` table. All the data in the column will be lost.
  - Added the required column `nomeEmpresa` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "nomeEmprepsa",
ADD COLUMN     "nomeEmpresa" TEXT NOT NULL;
