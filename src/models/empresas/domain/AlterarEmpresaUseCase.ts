import { Empresa, EmpresaUpdateDto } from "../data/entity/Empresa";
import { EmpresaRepository } from "../data/repository/EmpresaRepository";

export class AlterarEmpresaUseCase {

    constructor(private empresaRepository: EmpresaRepository) { }

    async execute(nome: string, empresaUpdate: EmpresaUpdateDto): Promise<Empresa> {
        try {

            return await this.empresaRepository.alterarEmpresa(nome, empresaUpdate)

        } catch (error) {
            throw new Error("Problema ao alterar empresa")
        }
    }

}