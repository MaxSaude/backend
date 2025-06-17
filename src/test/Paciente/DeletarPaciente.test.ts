import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { BuscarPacientePorCodigoUseCase } from "../../models/pacientes/domain/BuscarPorCodigoUseCase";
import { DeletarPacienteUseCase } from "../../models/pacientes/domain/DeletarUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import prisma from "../../config/database";
import { v4 as uuidv4 } from "uuid";

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

        // Aguarda um tick do event loop para garantir a deleção
        await new Promise(resolve => setTimeout(resolve, 10));

        // (Opcional) Verifica se ainda há pacientes
        const pacientesRestantes = await prisma.paciente.count();
        if (pacientesRestantes > 0) {
            throw new Error(`Ainda existem ${pacientesRestantes} pacientes no banco!`);
        }

        // Limpa os registros existentes na tabela Empresa
        await prisma.empresa.deleteMany();

        // Agora pode criar a empresa normalmente
        const empresaId = uuidv4();
        const razaoSocial = "Empresa Teste " + empresaId; // valor único para cada teste
        await prisma.empresa.create({
            data: {
                codigo: empresaId,
                razaoSocial: razaoSocial,
                nomeFantasia: "Fantasia Teste",
                cnpj: empresaId.slice(0, 14).replace(/-/g, "1") // também garante unicidade
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
            cidade: fakeService.nome,
            bairro: fakeService.nome,
            estado: fakeService.nome,
            endereco: fakeService.nome,
            numero: fakeService.nome,
            complemento: fakeService.nome,
        };
        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        expect(paciente).toBeDefined();

        await deletarPacienteUseCase.execute(paciente.codigo);
        
        const pacienteRetorno = await buscarPacientePorCodigoUseCase.execute(paciente.codigo);
        expect(pacienteRetorno).toBeNull();
    });

});