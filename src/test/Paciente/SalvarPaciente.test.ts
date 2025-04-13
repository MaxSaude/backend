import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";
import { FakeDataService } from "../../services/fake.data.service";

describe('SalvarPaciente', () => {

    let salvarPacienteUseCase: SalvarPacienteUseCase;
    let fakeService: any;

    beforeEach(() => {
        const pacienteRepository = new PacienteRepository();
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova paciente', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.nome,
        }

        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        expect(paciente).toBeDefined();
        expect(paciente.codigo).toBeDefined();
        expect(paciente.nome).toBe(paciente.nome);
        expect(pacienteCriacaoDto.cpf).toBe(paciente.cpf);
        expect(pacienteCriacaoDto.contato).toBe(paciente.contato);
        expect(pacienteCriacaoDto.empresaId).toBe(paciente.empresaId);
    })

})