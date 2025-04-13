import { Paciente } from "@prisma/client";
import prisma from "../../../../config/database";
import { PacienteCriacaoDto, PacienteUpdateDto } from "../entity/Paciente";


export interface PacienteRepositoryInterface {
    //nome(parametro:tipoParametro):retorno
    salvarPaciente(paciente: PacienteCriacaoDto): Promise<Paciente>
}
export class PacienteRepository implements PacienteRepositoryInterface {

    async verificarEmpresaExistente(empresaId: string): Promise<boolean> {
        try {
            const empresa = await prisma.empresa.findUnique({
                where: { codigo: empresaId }
            });
            return !!empresa; // Retorna true se a empresa existir, false caso contrário
        } catch (error) {
            console.log(error);
            throw new Error("Problema ao verificar empresa");
        }
    }

    async salvarPaciente(paciente: PacienteCriacaoDto): Promise<Paciente> {
        try {
            // Valida se a empresa existe
            const empresaExiste = await this.verificarEmpresaExistente(paciente.empresaId);
            if (!empresaExiste) {
                throw new Error("Empresa não encontrada");
            }
    
            // Salva o paciente
            return await prisma.paciente.create({
                data: paciente
            });
        } catch (error) {
            console.log(error);
            throw new Error("Falha ao salvar paciente");
        }
    }

    async buscarPacientePorCodigo(codigo: string): Promise<Paciente | null> {
        try {
            return await prisma.paciente.findUnique({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao buscar paciente")
        }
    }
    
    async buscarTodosPacientes(): Promise<Paciente[] | null> {
        try {
            return await prisma.paciente.findMany()
        } catch (error) {
            throw new Error("Problema ao buscar paciente")
        }
    }


    async alterarPaciente(codigo: string, paciente: PacienteUpdateDto): Promise<Paciente> {
        try {
            // Valida se a empresa existe, caso o `empresaId` seja fornecido
            if (paciente.empresaId) {
                const empresaExiste = await this.verificarEmpresaExistente(paciente.empresaId);
                if (!empresaExiste) {
                    throw new Error("Empresa não encontrada");
                }
            }
    
            // Atualiza o paciente
            return await prisma.paciente.update({
                where: { codigo },
                data: paciente
            });
        } catch (error) {
            console.log(error);
            throw new Error("Problema ao alterar paciente");
        }
    }

    async deletarPaciente(codigo: string): Promise<void> {
        try {
            await prisma.paciente.delete({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao deletar paciente")
        }
    }
}