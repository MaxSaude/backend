-- CreateTable
CREATE TABLE "usuario" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "codigo" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("codigo"),
    CONSTRAINT "Paciente_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("codigo") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "tipoConsulta" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataAlteracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_razaoSocial_key" ON "Empresa"("razaoSocial");

CREATE UNIQUE INDEX "Agendamento_nome_key" ON "Agendamento"("nome");
