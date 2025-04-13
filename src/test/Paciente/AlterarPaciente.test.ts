import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto, PacienteUpdateDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { AlterarPacienteUseCase } from "../../models/pacientes/domain/AlterarUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";

describe("AlteracaoPacienteTest", () => {

    let alterarPacienteUseCase: AlterarPacienteUseCase;
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(() => {
        const pacienteRepository = new PacienteRepository();
        alterarPacienteUseCase = new AlterarPacienteUseCase(pacienteRepository);
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRepository);
        fakeService = FakeDataService();
    });

    it('Alterar paciente cadastrado', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.nome
        };
        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        const pacienteAlterarDto: PacienteUpdateDto = {
            nome: fakeService.nome,
            cpf: "UPDATE PACIENTE",
            contato: "UPDATE PACIENTE",
            empresaId: "UPDATE PACIENTE"
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