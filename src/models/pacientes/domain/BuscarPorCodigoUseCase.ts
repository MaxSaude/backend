import { Paciente } from "../data/entity/Paciente";
import { PacienteRepository } from "../data/repository/PacienteRepository";

export class BuscarPacientePorCodigoUseCase {

    constructor(private pacienteRepository: PacienteRepository) { }

    async execute(codigo: string): Promise<Paciente | null> {
        try {

            return await this.pacienteRepository.buscarPacientePorCodigo(codigo)

        } catch (error) {
            throw new Error("Problema ao buscar paciente")
        }
    }

}