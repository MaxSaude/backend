import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto, PacienteUpdateDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { AlterarPacienteUseCase } from "../../models/pacientes/domain/AlterarUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import prisma from "../../config/database";

describe("AlteracaoPacienteTest", () => {

    let alterarPacienteUseCase: AlterarPacienteUseCase;
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(async () => {
        const pacienteRepository = new PacienteRepository();
        alterarPacienteUseCase = new AlterarPacienteUseCase(pacienteRepository);
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

    it('Alterar paciente cadastrado', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.empresaId // Usa o ID válido da empresa
        };
        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        const pacienteAlterarDto: PacienteUpdateDto = {
            nome: fakeService.nome,
            cpf: "UPDATE PACIENTE",
            contato: "UPDATE PACIENTE",
            empresaId: fakeService.empresaId // Mantém o ID válido da empresa
        };

        const pacienteUpdate = 
            await alterarPacienteUseCase.execute(paciente.codigo, pacienteAlterarDto);

        expect(pacienteUpdate).toBeDefined();
        expect(pacienteUpdate.codigo).toBe(paciente.codigo);
        expect(pacienteUpdate.nome).toBe(pacienteAlterarDto.nome);
        expect(pacienteUpdate.cpf).toBe(pacienteAlterarDto.cpf);
        expect(pacienteUpdate.contato).toBe(pacienteAlterarDto.contato);
        expect(pacienteUpdate.empresaId).toBe(pacienteAlterarDto.empresaId);
    });

});