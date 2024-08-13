import {Prisma } from "@prisma/client";
import prisma from "../../../../config/database";
import { DisciplinaCriacaoDto, DisciplinaUpdateDto } from "../entity/Disciplina";


export interface DisciplinaRepositoryInterface {
    //nome(parametro:tipoParametro):retorno
    salvarDisciplina(disciplina: DisciplinaCriacaoDto): Promise<Disciplina>
}
export class DisciplinaRepository implements DisciplinaRepositoryInterface {

    async salvarDisciplina(disciplina: DisciplinaCriacaoDto): Promise<Disciplina> {
        try {

            return await Prisma.disciplina.create({
                data: disciplina
            })

        } catch (error) {
            console.log(error)
            throw new Error('Falha ao salvar disciplina');
        }

    }

    async buscarDisciplinaPorCodigo(codigo: string): Promise<Disciplina | null> {
        try {
            return await prisma.disciplina.findUnique({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao buscar disciplina")
        }
    }
    
    async buscarTodasDisciplinas(): Promise<Disciplina[] | null> {
        try {
            return await prisma.disciplina.findMany()
        } catch (error) {
            throw new Error("Problema ao buscar disciplina")
        }
    }


    async alterarDisciplina(codigo: string, disciplina: DisciplinaUpdateDto): Promise<Disciplina> {
        try {
            return await prisma.disciplina.update({
                where: { codigo },
                data: disciplina
            })
        } catch (error) {
            console.log(error)
            throw new Error("Problema ao alterar disciplina")
        }
    }

    async deletarDisciplina(codigo: string): Promise<void> {
        try {
            await prisma.disciplina.delete({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao deletar disciplina")
        }
    }






}