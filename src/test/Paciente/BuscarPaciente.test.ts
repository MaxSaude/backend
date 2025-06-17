import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { BuscarPacientePorCodigoUseCase } from "../../models/pacientes/domain/BuscarPorCodigoUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import prisma from "../../config/database";
import { v4 as uuidv4 } from "uuid";

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

        // Gera um ID único para a empresa
        const empresaId = uuidv4();
        await prisma.empresa.create({
            data: {
                codigo: empresaId,
                razaoSocial: "Empresa Teste " + empresaId,
                nomeFantasia: "Fantasia Teste",
                cnpj: empresaId.slice(0, 14).replace(/-/g, "1")
            }
        });

        fakeService.empresaId = empresaId; // Usa o ID único gerado
    });

    it('Buscar paciente por Código', async () => {

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

        const pacienteBusca = await buscarPacientePorCodigoUseCase.execute(paciente.codigo);

        expect(pacienteBusca).toBeDefined();
        expect(paciente.codigo).toBe(pacienteBusca!.codigo);
        expect(paciente.nome).toBe(pacienteBusca!.nome);
        expect(paciente.cpf).toBe(pacienteBusca!.cpf);
        expect(paciente.contato).toBe(pacienteBusca!.contato);
        expect(paciente.empresaId).toBe(pacienteBusca!.empresaId);
        expect(paciente.cidade).toBe(pacienteBusca!.cidade);
        expect(paciente.bairro).toBe(pacienteBusca!.bairro);
        expect(paciente.estado).toBe(pacienteBusca!.estado);
        expect(paciente.endereco).toBe(pacienteBusca!.endereco);
        expect(paciente.numero).toBe(pacienteBusca!.numero);
        expect(paciente.complemento).toBe(pacienteBusca!.complemento);
    });

    it('verificar Paciente não encontrado', async () => {

        const codigo = '00';
        const pacienteBusca = await buscarPacientePorCodigoUseCase.execute(codigo);

        expect(pacienteBusca).toBeNull();

    });

});