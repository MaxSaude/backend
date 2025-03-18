/*
  Warnings:

  - Added the required column `data` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendamento" ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "horario" TEXT NOT NULL;
