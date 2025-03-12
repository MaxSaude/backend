import { AgendamentoCriacaoDto, AgendamentoUpdateDto } from "../../models/agendamentos/data/entity/Agendamento";
import { AgendamentoRepository } from "../../models/agendamentos/data/repository/AgendamentoRepository";
import { AlterarAgendamentoUseCase } from "../../models/agendamentos/domain/AlterarUseCase";
import { SalvarAgendamentoUseCase } from "../../models/agendamentos/domain/SalvarUseCase";
import { FakeDataService } from "../../../src/services/fake.data.service";

describe("AlteracaoAgendamentoTest", () =>{

    let alterarAgendamentoUseCase: AlterarAgendamentoUseCase;
    let salvarAgendamentoUseCase: SalvarAgendamentoUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const agendamentoRepository = new AgendamentoRepository();
        alterarAgendamentoUseCase = new AlterarAgendamentoUseCase(agendamentoRepository);
        salvarAgendamentoUseCase = new SalvarAgendamentoUseCase(agendamentoRepository);
        fakeService = FakeDataService();
    })

    it('Alterar agendamento cadastrada', async () => {

        const agendamentoCriacaoDto: AgendamentoCriacaoDto = {
            nome: fakeService.nome,
            nomeEmpresa: fakeService.nome,
            tipoConsulta: fakeService.nome
        }
        const agendamento = await salvarAgendamentoUseCase.execute(agendamentoCriacaoDto);

        const agendamentoAlterarDto : AgendamentoUpdateDto = {
            nome: fakeService.nome,
            nomeEmpresa: "UPDATE AGENDAMENTO",
            tipoConsulta: "UPDATE AGENDAMENTO"
        }

        const agendamentoUpdate = 
            await alterarAgendamentoUseCase.execute(agendamento.cpf, agendamentoAlterarDto);

        expect(agendamentoUpdate).toBeDefined()
        expect(agendamentoUpdate.cpf).toBe(agendamento.cpf);
        expect(agendamentoUpdate.nome).toBe(agendamentoAlterarDto.nome);
        expect(agendamentoUpdate.nomeEmpresa).toBe(agendamentoAlterarDto.nomeEmpresa);
        expect(agendamentoUpdate.tipoConsulta).toBe(agendamentoAlterarDto.tipoConsulta)
    })

})