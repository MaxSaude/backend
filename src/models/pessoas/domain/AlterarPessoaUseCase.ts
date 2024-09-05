import { Pessoa } from "../data/entity/Pessoa"
import { PessoaRepository } from "../data/repository/PessoaRepository"


export class AlterarPessoaUseCase {

    constructor(private pessoaRepository: PessoaRepository) { }

    async execute(nome: string, pessoaUpdate: PessoaUpdateDto): Promise<Pessoa> {
        try {

            return await this.pessoaRepository.alterarPessoa(nome, pessoaUpdate)

        } catch (error) {
            throw new Error("Problema ao alterar pessoa")
        }
    }

}