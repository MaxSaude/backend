
import { AgendamentoRepository } from "../../models/agendamentos/data/repository/AgendamentoRepository";
import { FakeDataService } from "../../../src/services/fake.data.service";
import { SalvarAgendamentoUseCase } from "../../models/agendamentos/domain/SalvarUseCase";
import { AgendamentoCriacaoDto } from "../../models/agendamentos/data/entity/Agendamento";

describe('SalvarAgendamento', () => {

    let salvarAgendamentoUseCase: SalvarAgendamentoUseCase;
    let fakeService: any;

    beforeEach(() => {
        const agendamentoRepository = new AgendamentoRepository();
        salvarAgendamentoUseCase = new SalvarAgendamentoUseCase(agendamentoRepository);
        fakeService = FakeDataService();
    })

    it('teste de criação de novo agendamento', async () => {

        const agendamentoCriacaoDto: AgendamentoCriacaoDto = {
            nome: fakeService.nome,
            nomeEmpresa: fakeService.nome,
            tipoConsulta: fakeService.nome,
            data: fakeService.nome,
            horario: fakeService.nome,
        }

        const agendamento = await salvarAgendamentoUseCase.execute(agendamentoCriacaoDto);

        expect(agendamento).toBeDefined();
        expect(agendamento.cpf).toBeDefined();
        expect(agendamentoCriacaoDto.nome).toBe(agendamento.nome);
        expect(agendamentoCriacaoDto.nomeEmpresa).toBe(agendamento.nomeEmpresa);
        expect(agendamentoCriacaoDto.tipoConsulta).toBe(agendamento.tipoConsulta);
        expect(agendamento.data).toBe(agendamento.data);
        expect(agendamento.horario).toBe(agendamento.horario);

    })

})