import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { BuscarPacientePorCodigoUseCase } from "../../models/pacientes/domain/BuscarPorCodigoUseCase";
import { DeletarPacienteUseCase } from "../../models/pacientes/domain/DeletarUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import prisma from "../../config/database";

describe("DeletarPacienteTest", () => {

    let deletarPacienteUseCase: DeletarPacienteUseCase;
    let buscarPacientePorCodigoUseCase: BuscarPacientePorCodigoUseCase;
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(async () => {
        const pacienteRepository = new PacienteRepository();
        deletarPacienteUseCase = new DeletarPacienteUseCase(pacienteRepository);
        buscarPacientePorCodigoUseCase = new BuscarPacientePorCodigoUseCase(pacienteRepository);
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

    it('deletar paciente cadastrado', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.empresaId, // Usa o ID válido da empresa
        };
        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        expect(paciente).toBeDefined();

        await deletarPacienteUseCase.execute(paciente.codigo);
        
        const pacienteRetorno = await buscarPacientePorCodigoUseCase.execute(paciente.codigo);
        expect(pacienteRetorno).toBeNull();
    });

});