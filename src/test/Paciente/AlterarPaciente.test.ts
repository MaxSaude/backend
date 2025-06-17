import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto, PacienteUpdateDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { AlterarPacienteUseCase } from "../../models/pacientes/domain/AlterarUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import prisma from "../../config/database";
import { v4 as uuidv4 } from "uuid";

describe("AlteracaoPacienteTest", () => {

    let alterarPacienteUseCase: AlterarPacienteUseCase;
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(async () => {
        const pacienteRepository = new PacienteRepository();
        alterarPacienteUseCase = new AlterarPacienteUseCase(pacienteRepository);
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRepository);

        // Limpa os registros existentes na tabela Paciente
        await prisma.paciente.deleteMany();

        // Limpa os registros existentes na tabela Empresa
        await prisma.empresa.deleteMany();

        // Agora pode criar a empresa normalmente
        const empresaId = uuidv4();
        const razaoSocial = "Empresa Teste " + empresaId; // valor único

        await prisma.empresa.create({
            data: {
                codigo: empresaId,
                razaoSocial: razaoSocial,
                nomeFantasia: "Fantasia Teste",
                cnpj: empresaId.slice(0, 14).replace(/-/g, "1") // só para garantir unicidade
            }
        });

        // Inicialize o fakeService depois de criar a empresa
        fakeService = FakeDataService();
        fakeService.empresaId = empresaId; // Define o ID válido no FakeDataService
    });

    it('Alterar paciente cadastrado', async () => {

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

        const pacienteAlterarDto: PacienteUpdateDto = {
            nome: fakeService.nome,
            cpf: uuidv4(),
            contato: "UPDATE PACIENTE",
            empresaId: fakeService.empresaId, // Mantém o ID válido da empresa
            cidade: "UPDATE PACIENTE",
            bairro: "UPDATE PACIENTE",
            estado: "UPDATE PACIENTE",
            endereco: "UPDATE PACIENTE",
            numero: "UPDATE PACIENTE",
            complemento: "UPDATE PACIENTE", 
        };

        const pacienteUpdate = 
            await alterarPacienteUseCase.execute(paciente.codigo, pacienteAlterarDto);

        expect(pacienteUpdate).toBeDefined();
        expect(pacienteUpdate.codigo).toBe(paciente.codigo);
        expect(pacienteUpdate.nome).toBe(pacienteAlterarDto.nome);
        expect(pacienteUpdate.cpf).toBe(pacienteAlterarDto.cpf);
        expect(pacienteUpdate.contato).toBe(pacienteAlterarDto.contato);
        expect(pacienteUpdate.empresaId).toBe(pacienteAlterarDto.empresaId);
        expect(pacienteUpdate.cidade).toBe(pacienteAlterarDto.cidade);
        expect(pacienteUpdate.bairro).toBe(pacienteAlterarDto.bairro);
        expect(pacienteUpdate.estado).toBe(pacienteAlterarDto.estado);
        expect(pacienteUpdate.endereco).toBe(pacienteAlterarDto.endereco);
        expect(pacienteUpdate.numero).toBe(pacienteAlterarDto.numero);
        expect(pacienteUpdate.complemento).toBe(pacienteAlterarDto.complemento);
    });

});