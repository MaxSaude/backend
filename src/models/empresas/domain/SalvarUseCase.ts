import { EmpresaCriacaoDto } from "../data/entity/Empresa";
import { EmpresaRepository } from "../data/repository/EmpresaRepository";


export class SalvarEmpresaUseCase {

    constructor(private empresaRepository: EmpresaRepository) { }

    async execute(empresa: EmpresaCriacaoDto) {
        try {

            return await this.empresaRepository.salvarEmpresa(empresa);

        } catch (error) {
            console.log(error)
            throw new Error("Problema ao criar empresa")
        }
    }

}