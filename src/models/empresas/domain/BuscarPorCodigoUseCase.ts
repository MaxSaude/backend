import { Empresa } from "../data/entity/Empresa";
import { EmpresaRepository } from "../data/repository/EmpresaRepository";

export class BuscarEmpresaPorCodigoUseCase {

    constructor(private empresaRepository: EmpresaRepository) { }

    async execute(codigo: string): Promise<Empresa | null> {
        try {

            return await this.empresaRepository.buscarEmpresaPorCodigo(codigo)

        } catch (error) {
            throw new Error("Problema ao buscar empresa")
        }
    }

}