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

        // Aguarda um tick do event loop para garantir a deleção (opcional, mas pode ajudar)
        await new Promise(resolve => setTimeout(resolve, 10));

        // Verifica se ainda há pacientes
        const pacientesRestantes = await prisma.paciente.count();
        if (pacientesRestantes > 0) {
            throw new Error(`Ainda existem ${pacientesRestantes} pacientes no banco!`);
        }

        // Limpa os registros existentes na tabela Empresa
        await prisma.empresa.deleteMany();

        // Agora pode criar a empresa normalmente
        const empresaId = "valid_empresa_id";
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
            cidade: fakeService.nome,
            bairro: fakeService.nome,
            estado: fakeService.nome,
            endereco: fakeService.nome,
            numero: fakeService.nome,
            complemento: fakeService.nome,
        };

        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        expect(paciente).toBeDefined();
        expect(paciente.codigo).toBeDefined();
        expect(paciente.nome).toBe(pacienteCriacaoDto.nome);
        expect(paciente.cpf).toBe(pacienteCriacaoDto.cpf);
        expect(paciente.contato).toBe(pacienteCriacaoDto.contato);
        expect(paciente.empresaId).toBe(pacienteCriacaoDto.empresaId);
        expect(paciente.cidade).toBe(pacienteCriacaoDto.cidade);
        expect(paciente.bairro).toBe(pacienteCriacaoDto.bairro);
        expect(paciente.estado).toBe(pacienteCriacaoDto.estado);
        expect(paciente.endereco).toBe(pacienteCriacaoDto.endereco);
        expect(paciente.numero).toBe(pacienteCriacaoDto.numero);
        expect(paciente.complemento).toBe(pacienteCriacaoDto.complemento);
    });

});