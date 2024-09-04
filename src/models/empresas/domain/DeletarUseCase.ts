import { EmpresaRepository } from "../data/repository/EmpresaRepository"


export class DeletarEmpresaUseCase {

    constructor(private empresaRepository: EmpresaRepository) { }

    async execute(codigo: string) {
        try {

            await this.empresaRepository.deletarEmpresa(codigo)

        } catch (error) {
            throw new Error("Problema ao deletar empresa")
        }
    }

}