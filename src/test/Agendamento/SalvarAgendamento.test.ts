
import { SalvarAgendamentoUseCase } from "../../models/agendamentos/domain/SalvarUseCase";
import { AgendamentoCriacaoDto } from "../../models/agendamentos/data/entity/Agendamento";
import { FakeDataService } from "../../../src/services/fake.data.service";
import { AgendamentoRepository } from "../../models/agendamentos/data/repository/AgendamentoRepository";

describe('SalvarAgendamento', () => {

    let salvarAgendamentoUseCase: SalvarAgendamentoUseCase;
    let fakeService: any;

    beforeEach(() => {
        const agendamentoRepository = new AgendamentoRepository();
        salvarAgendamentoUseCase = new SalvarAgendamentoUseCase(agendamentoRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de nova agendamento', async () => {

        const agendamentoCriacaoDto: AgendamentoCriacaoDto = {
            nome: fakeService.nome,
            nomeEmpresa: fakeService.nome,
            tipoConsulta: fakeService.nome
        }

        const agendamento = await salvarAgendamentoUseCase.execute(agendamentoCriacaoDto);

        expect(agendamento).toBeDefined();
        expect(agendamento.cpf).toBeDefined();
        expect(agendamentoCriacaoDto.nome).toBe(agendamento.nome);
        expect(agendamentoCriacaoDto.nomeEmpresa).toBe(agendamento.nomeEmpresa);
        expect(agendamentoCriacaoDto.tipoConsulta).toBe(agendamento.tipoConsulta);

    })

})