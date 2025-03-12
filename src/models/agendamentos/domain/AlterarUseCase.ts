import { Agendamento, AgendamentoUpdateDto } from "../data/entity/Agendamento";
import { AgendamentoRepository } from "../data/repository/AgendamentoRepository";

export class AlterarAgendamentoUseCase {

    constructor(private agendamentoRepository: AgendamentoRepository) { }

    async execute(nome: string, agendamentoUpdate: AgendamentoUpdateDto): Promise<Agendamento> {
        try {

            return await this.agendamentoRepository.alterarAgendamento(nome, agendamentoUpdate)

        } catch (error) {
            throw new Error("Problema ao alterar agendamento")
        }
    }

}