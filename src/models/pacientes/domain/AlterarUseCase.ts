import { Paciente, PacienteUpdateDto } from "../data/entity/Paciente";
import { PacienteRepository } from "../data/repository/PacienteRepository";

export class AlterarPacienteUseCase {

    constructor(private pacienteRepository: PacienteRepository) { }

    async execute(nome: string, pacienteUpdate: PacienteUpdateDto): Promise<Paciente> {
        try {

            return await this.pacienteRepository.alterarPaciente(nome, pacienteUpdate)

        } catch (error) {
            throw new Error("Problema ao alterar paciente")
        }
    }

}