import { AgendamentoCriacaoDto } from "../data/entity/Agendamento";
import { AgendamentoRepository } from "../data/repository/AgendamentoRepository";


export class SalvarAgendamentoUseCase {

    constructor(private agendamentoRepository: AgendamentoRepository) { }

    async execute(agendamento: AgendamentoCriacaoDto) {
        try {

            return await this.agendamentoRepository.salvarAgendamento(agendamento);

        } catch (error) {
            console.log(error)
            throw new Error("Problema ao criar agendamento")
        }
    }

}