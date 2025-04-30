import prisma from "../../config/database";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import { FakeDataService } from "../../services/fake.data.service";

describe('SalvarPaciente', () => {

    let salvarPacienteUseCase: SalvarPacienteUseCase;
    let fakeService: any;

    beforeEach(async () => {
        const pacienteRepository = new PacienteRepository();
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRepository);
        fakeService = FakeDataService();

        // Limpa os registros existentes na tabela Paciente
        await prisma.paciente.deleteMany();

        // Limpa os registros existentes na tabela Empresa
        await prisma.empresa.deleteMany();

        // Insere um registro de teste na tabela Empresa
        const empresaId = "valid_empresa_id"; // ID válido para a empresa
        await prisma.empresa.create({
            data: {
                codigo: empresaId,
                razaoSocial: "Empresa Teste",
                nomeFantasia: "Fantasia Teste",
                cnpj: "12345678000100"
            }
        });

        fakeService.empresaId = empresaId; // Define o ID válido no FakeDataService
    });

    it('teste de criação de nova paciente', async () => {
        // Cria o paciente usando o empresaId válido
        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.empresaId, // Usa o ID válido da empresa
        };

        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        expect(paciente).toBeDefined();
        expect(paciente.codigo).toBeDefined();
        expect(paciente.nome).toBe(pacienteCriacaoDto.nome);
        expect(paciente.cpf).toBe(pacienteCriacaoDto.cpf);
        expect(paciente.contato).toBe(pacienteCriacaoDto.contato);
        expect(paciente.empresaId).toBe(pacienteCriacaoDto.empresaId);
    });

});