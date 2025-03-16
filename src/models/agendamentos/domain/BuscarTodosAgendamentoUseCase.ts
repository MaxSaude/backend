import { Agendamento } from "../data/entity/Agendamento"
import { AgendamentoRepository } from "../data/repository/AgendamentoRepository"

export class BuscarTodosAgendamentoUseCase {

    constructor(private agendamentoRepository: AgendamentoRepository) { }

    async execute(): Promise<Agendamento[] | null> {
        try {

            return await this.agendamentoRepository.buscarTodosAgendamentos()

        } catch (error) {
            throw new Error("Problema ao buscar agendamento")
        }
    }

}