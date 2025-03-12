import { Agendamento } from "../data/entity/Agendamento";
import { AgendamentoRepository } from "../data/repository/AgendamentoRepository";

export class BuscarAgendamentoPorCpfUseCase {

    constructor(private agendamentoRepository: AgendamentoRepository) { }

    async execute(cpf: string): Promise<Agendamento | null> {
        try {

            return await this.agendamentoRepository.buscarAgendamentoPorCpf(cpf)

        } catch (error) {
            throw new Error("Problema ao buscar agendamento")
        }
    }

}