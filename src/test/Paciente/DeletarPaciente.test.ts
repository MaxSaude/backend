import { FakeDataService } from "../../services/fake.data.service";
import { PacienteCriacaoDto } from "../../models/pacientes/data/entity/Paciente";
import { PacienteRepository } from "../../models/pacientes/data/repository/PacienteRepository";
import { BuscarPacientePorCodigoUseCase } from "../../models/pacientes/domain/BuscarPorCodigoUseCase";
import { DeletarPacienteUseCase } from "../../models/pacientes/domain/DeletarUseCase";
import { SalvarPacienteUseCase } from "../../models/pacientes/domain/SalvarUseCase";

describe("DeletarPacienteTest", () => {

    let deletarPacienteUseCase: DeletarPacienteUseCase;
    let buscarPacientePorCodigoUseCase: BuscarPacientePorCodigoUseCase;
    let salvarPacienteUseCase: SalvarPacienteUseCase; 
    let fakeService: any;

    beforeEach(() => {
        const pacienteRepository = new PacienteRepository();
        deletarPacienteUseCase = new DeletarPacienteUseCase(pacienteRepository);
        buscarPacientePorCodigoUseCase = new BuscarPacientePorCodigoUseCase(pacienteRepository);
        salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRepository);
        fakeService = FakeDataService();
    });

    it('deletar paciente cadastrado', async () => {

        const pacienteCriacaoDto: PacienteCriacaoDto = {
            nome: fakeService.nome,
            cpf: fakeService.nome,
            contato: fakeService.nome,
            empresaId: fakeService.nome,
        };
        const paciente = await salvarPacienteUseCase.execute(pacienteCriacaoDto);

        expect(paciente).toBeDefined();

        await deletarPacienteUseCase.execute(paciente.codigo);
        
        const pacienteRetorno = await buscarPacientePorCodigoUseCase.execute(paciente.codigo);
        expect(pacienteRetorno).toBeNull();
    });

});