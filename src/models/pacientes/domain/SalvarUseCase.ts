import { PacienteCriacaoDto } from "../data/entity/Paciente";
import { PacienteRepository } from "../data/repository/PacienteRepository";


export class SalvarPacienteUseCase {

    constructor(private pacienteRepository: PacienteRepository) { }

    async execute(paciente: PacienteCriacaoDto) {
        try {

            return await this.pacienteRepository.salvarPaciente(paciente);

        } catch (error) {
            console.log(error)
            throw new Error("Problema ao criar paciente")
        }
    }

}