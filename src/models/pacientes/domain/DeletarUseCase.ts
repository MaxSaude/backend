import { PacienteRepository } from "../data/repository/PacienteRepository"

export class DeletarPacienteUseCase {

    constructor(private pacienteRepository: PacienteRepository) { }

    async execute(codigo: string) {
        try {

            await this.pacienteRepository.deletarPaciente(codigo)

        } catch (error) {
            throw new Error("Problema ao deletar paciente")
        }
    }

}