
import { SalvarAgendamentoUseCase } from "../../models/agendamentos/domain/SalvarUseCase";
import { FakeDataService } from "../../../src/services/fake.data.service";
import { BuscarAgendamentoPorCpfUseCase } from "../../models/agendamentos/domain/BuscarPorCpfUseCase";
import { AgendamentoCriacaoDto } from "../../models/agendamentos/data/entity/Agendamento";
import { AgendamentoRepository } from "../../models/agendamentos/data/repository/AgendamentoRepository";

describe("Busca de Agendamento", () => {

    let buscarAgendamentoPorCpfUseCase : BuscarAgendamentoPorCpfUseCase; 
    let salvarAgendamentoUseCase: SalvarAgendamentoUseCase; 
    let fakeService: any;

    beforeEach( ()=>{
        const agendamentoRoutes = new AgendamentoRepository();
        buscarAgendamentoPorCpfUseCase = new BuscarAgendamentoPorCpfUseCase(agendamentoRoutes) 
        salvarAgendamentoUseCase = new SalvarAgendamentoUseCase(agendamentoRoutes)
        fakeService = FakeDataService();
    })

    it('Buscar agendamento por CPF', async () => {

        const agendamentoCriacaoDto: AgendamentoCriacaoDto = {
            nome: fakeService.nome,
            nomeEmpresa: fakeService.nome,
            tipoConsulta: fakeService.nome
        }
        const agendamento = await salvarAgendamentoUseCase.execute(agendamentoCriacaoDto);

        const agendamentoBusca = await buscarAgendamentoPorCpfUseCase.execute(agendamento.cpf);

        expect(agendamentoBusca).toBeDefined();
        expect(agendamento.cpf).toBe(agendamentoBusca!.cpf)
        expect(agendamento.nome).toBe(agendamentoBusca!.nome)
        expect(agendamento.nomeEmpresa).toBe(agendamentoBusca!.nomeEmpresa)
        expect(agendamento.tipoConsulta).toBe(agendamentoBusca!.tipoConsulta)
    })

    it('verificar agendamento não encontrada', async () => {

        const cpf = '00'
        const agendamentoBusca = await buscarAgendamentoPorCpfUseCase.execute(cpf);

        expect(agendamentoBusca).toBeNull();

    })


})