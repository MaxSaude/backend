/*
  Warnings:

  - You are about to drop the column `dataAlteracao` on the `Paciente` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `Paciente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_empresaId_fkey";

-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "dataAlteracao",
DROP COLUMN "dataCriacao";

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
