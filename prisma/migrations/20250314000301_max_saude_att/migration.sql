-- CreateTable
CREATE TABLE "Agendamento" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeEmprepsa" TEXT NOT NULL,
    "tipoConsulta" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agendamento_nome_key" ON "Agendamento"("nome");
