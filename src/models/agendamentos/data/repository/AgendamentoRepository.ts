import { Agendamento } from "@prisma/client";
import prisma from "../../../../config/database";
import { AgendamentoCriacaoDto, AgendamentoUpdateDto } from "../entity/Agendamento";


export interface AgendamentoRepositoryInterface {
    //nome(parametro:tipoParametro):retorno
    salvarAgendamento(agendamento: AgendamentoCriacaoDto): Promise<Agendamento>
}
export class AgendamentoRepository implements AgendamentoRepositoryInterface {

    async salvarAgendamento(agendamento: AgendamentoCriacaoDto): Promise<Agendamento> {
        try {

            return await prisma.agendamento.create({
                data: agendamento
            })

        } catch (error) {
            console.log(error)
            throw new Error('Falha ao salvar agendamento');
        }

    }

    async buscarAgendamentoPorCpf(cpf: string): Promise<Agendamento | null> {
        try {
            return await prisma.agendamento.findUnique({
                where: { cpf }
            })
        } catch (error) {
            throw new Error("Problema ao buscar agendamento")
        }
    }
    
    async buscarTodosAgendamentos(): Promise<Agendamento[] | null> {
        try {
            return await prisma.agendamento.findMany()
        } catch (error) {
            throw new Error("Problema ao buscar agendamento")
        }
    }


    async alterarAgendamento(cpf: string, agendamento: AgendamentoUpdateDto): Promise<Agendamento> {
        try {
            return await prisma.agendamento.update({
                where: { cpf },
                data: agendamento
            })
        } catch (error) {
            console.log(error)
            throw new Error("Problema ao alterar agendamento")
        }
    }

    async deletarAgendamento(cpf: string): Promise<void> {
        try {
            await prisma.agendamento.delete({
                where: { cpf }
            })
        } catch (error) {
            throw new Error("Problema ao deletar agendamento")
        }
    }

}