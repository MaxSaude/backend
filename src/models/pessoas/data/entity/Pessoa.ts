import { Empresa } from "@prisma/client";

export interface Pessoa {
    cpf: string;
    nomePessoa: string;
    senhaPessoa: string;
    emailPessoa: string;
    telefonePessoa: string;
    empresa: Empresa

}
export interface PessoaCriacaoDto {
    cpf: string;
    nomePessoa: string;
    senhaPessoa: string;
    emailPessoa: string;
    telefonePessoa: string;
    empresaCodigo: string;
}

export interface PessoaAtualizacaoDto {
    nomePessoa?: string;
    senhaPessoa?: string;
    emailPessoa?: string;
    telefonePessoa?: string;
    empresaCodigo: string;
}