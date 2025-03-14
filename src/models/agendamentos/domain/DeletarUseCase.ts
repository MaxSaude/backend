import { AgendamentoRepository } from "../data/repository/AgendamentoRepository"


export class DeletarAgendamentoUseCase {

    constructor(private agendamentoRepository: AgendamentoRepository) { }

    async execute(codigo: string) {
        try {

            await this.agendamentoRepository.deletarAgendamento(codigo)

        } catch (error) {
            throw new Error("Problema ao deletar agendamento")
        }
    }

}