import { Paciente } from "../data/entity/Paciente"
import { PacienteRepository } from "../data/repository/PacienteRepository"

export class BuscarTodosPacientesUseCase {

    constructor(private pacienteRepository: PacienteRepository) { }

    async execute(): Promise<Paciente[] | null> {
        try {

            return await this.pacienteRepository.buscarTodosPacientes()

        } catch (error) {
            throw new Error("Problema ao buscar pacientes")
        }
    }

}