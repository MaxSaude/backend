
import prisma from "../../../../config/database";
import { Pessoa, PessoaCriacaoDto } from "../entity/Pessoa";


export interface PessoaRepositoryInterface {
    //nome(parametro:tipoParametro):retorno
    salvarPessoa(pessoa: PessoaCriacaoDto): Promise<Pessoa>
}
export class PessoaRepository implements PessoaRepositoryInterface {

    async salvarPessoa(pessoa: PessoaCriacaoDto): Promise<Pessoa> {
        try {

            return await prisma.pessoa.create({
                data: pessoa
            })

        } catch (error) {
            console.log(error)
            throw new Error('Falha ao salvar pessoa');
        }

    }

    async buscarPessoaPorCodigo(codigo: string): Promise<Pessoa | null> {
        try {
            return await prisma.pessoa.findUnique({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao buscar pessoa")
        }
    }
    
    async buscarTodasPessoas(): Promise<Pessoa[] | null> {
        try {
            return await prisma.emprpessoaesa.findMany()
        } catch (error) {
            throw new Error("Problema ao buscar pessoa")
        }
    }


    async alterarPessoa(codigo: string, pessoa: PessoaUpdateDto): Promise<Pessoa> {
        try {
            return await prisma.pessoa.update({
                where: { codigo },
                data: pessoa
            })
        } catch (error) {
            console.log(error)
            throw new Error("Problema ao alterar pessoa")
        }
    }

    async deletarPessoa(codigo: string): Promise<void> {
        try {
            await prisma.pessoa.delete({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao deletar pessoa")
        }
    }






}