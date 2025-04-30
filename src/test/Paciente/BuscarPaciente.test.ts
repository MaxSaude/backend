import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { BuscarPacientePorCodigoUseCase } from "../../models/pacientes/domain/BuscarPorCodigoUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import prisma from "../../config/database";

describe("Busca de Paciente", () => {

    let buscarPacientePorCodigoUseCase: BuscarPacientePorCodigoUseCase; 
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(async () => {
        const pacienteRoutes = new PacienteRepository();
        buscarPacientePorCodigoUseCase = new BuscarPacientePorCodigoUseCase(pacienteRoutes);
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRoutes);
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

    it('Buscar paciente por Código', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.empresaId // Usa o ID válido da empresa
        };
        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        const pacienteBusca = await buscarPacientePorCodigoUseCase.execute(paciente.codigo);

        expect(pacienteBusca).toBeDefined();
        expect(paciente.codigo).toBe(pacienteBusca!.codigo);
        expect(paciente.nome).toBe(pacienteBusca!.nome);
        expect(paciente.cpf).toBe(pacienteBusca!.cpf);
        expect(paciente.contato).toBe(pacienteBusca!.contato);
        expect(paciente.empresaId).toBe(pacienteBusca!.empresaId);
    });

    it('verificar Paciente não encontrado', async () => {

        const codigo = '00';
        const pacienteBusca = await buscarPacientePorCodigoUseCase.execute(codigo);

        expect(pacienteBusca).toBeNull();

    });

});