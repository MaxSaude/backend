import { FakeDataService } from "../../../src/services/fake.data.service";
import { AgendamentoCriacaoDto } from "../../models/agendamentos/data/entity/Agendamento";
import { AgendamentoRepository } from "../../models/agendamentos/data/repository/AgendamentoRepository";
import { DeletarAgendamentoUseCase } from "../../models/agendamentos/domain/DeletarUseCase";
import { BuscarAgendamentoPorCpfUseCase } from "../../models/agendamentos/domain/BuscarPorCpfUseCase";
import { SalvarAgendamentoUseCase } from "../../models/agendamentos/domain/SalvarUseCase";

describe("DeletarAgendamentoTest", () =>{

    let deletarAgendamentoUseCase : DeletarAgendamentoUseCase;
    let buscarAgendamentoPorCpfUseCase : BuscarAgendamentoPorCpfUseCase;
    let salvarAgendamentoUseCase: SalvarAgendamentoUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const agendamentoRepository = new AgendamentoRepository();
        deletarAgendamentoUseCase = new DeletarAgendamentoUseCase(agendamentoRepository)
        buscarAgendamentoPorCpfUseCase = new BuscarAgendamentoPorCpfUseCase(agendamentoRepository)
        salvarAgendamentoUseCase = new SalvarAgendamentoUseCase(agendamentoRepository)
        fakeService = FakeDataService();
    })

    it('deletar agendamento cadastrada', async () => {

        const agendamentoCriacaoDto: AgendamentoCriacaoDto = {
            nome: fakeService.nome,
            nomeEmpresa: fakeService.nome,
            tipoConsulta: fakeService.nome,
        }
        const agendamento = await salvarAgendamentoUseCase.execute(agendamentoCriacaoDto);

        expect(agendamento).toBeDefined()

        await deletarAgendamentoUseCase.execute(agendamento.cpf);
        
        const agendamentoRetorno = await buscarAgendamentoPorCpfUseCase.execute(agendamento.nome);
        expect(agendamentoRetorno).toBeNull();
    })

})