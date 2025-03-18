/*
  Warnings:

  - You are about to drop the column `data` on the `Agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `Agendamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP COLUMN "data",
DROP COLUMN "horario";
