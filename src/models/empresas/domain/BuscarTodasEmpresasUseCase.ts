import { Empresa } from "../data/entity/Empresa"
import { EmpresaRepository } from "../data/repository/EmpresaRepository"

export class BuscarTodasEmpresasUseCase {

    constructor(private empresaRepository: EmpresaRepository) { }

    async execute(): Promise<Empresa[] | null> {
        try {

            return await this.empresaRepository.buscarTodasEmpresas()

        } catch (error) {
            throw new Error("Problema ao buscar empresas")
        }
    }

}