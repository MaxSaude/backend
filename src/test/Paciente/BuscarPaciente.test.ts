import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { BuscarPacientePorCodigoUseCase } from "../../models/pacientes/domain/BuscarPorCodigoUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";

describe("Busca de Paciente", () => {

    let buscarPacientePorCodigoUseCase: BuscarPacientePorCodigoUseCase; 
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(() => {
        const pacienteRoutes = new PacienteRepository();
        buscarPacientePorCodigoUseCase = new BuscarPacientePorCodigoUseCase(pacienteRoutes);
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRoutes);
        fakeService = FakeDataService();
    });

    it('Buscar paciente por Código', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.nome
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