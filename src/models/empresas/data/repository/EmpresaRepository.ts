import { Empresa } from "@prisma/client";
import prisma from "../../../../config/database";
import { EmpresaCriacaoDto, EmpresaUpdateDto } from "../entity/Empresa";


export interface EmpresaRepositoryInterface {
    //nome(parametro:tipoParametro):retorno
    salvarEmpresa(empresa: EmpresaCriacaoDto): Promise<Empresa>
}
export class EmpresaRepository implements EmpresaRepositoryInterface {

    async salvarEmpresa(empresa: EmpresaCriacaoDto): Promise<Empresa> {
        try {

            return await prisma.empresa.create({
                data: empresa
            })

        } catch (error) {
            console.log(error)
            throw new Error('Falha ao salvar empresa');
        }

    }

    async buscarEmpresaPorCodigo(codigo: string): Promise<Empresa | null> {
        try {
            return await prisma.empresa.findUnique({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao buscar empresa")
        }
    }
    
    async buscarTodasEmpresas(): Promise<Empresa[] | null> {
        try {
            return await prisma.empresa.findMany()
        } catch (error) {
            throw new Error("Problema ao buscar empresa")
        }
    }


    async alterarEmpresa(codigo: string, empresa: EmpresaUpdateDto): Promise<Empresa> {
        try {
            return await prisma.empresa.update({
                where: { codigo },
                data: empresa
            })
        } catch (error) {
            console.log(error)
            throw new Error("Problema ao alterar empresa")
        }
    }

    async deletarEmpresa(codigo: string): Promise<void> {
        try {
            await prisma.empresa.delete({
                where: { codigo }
            })
        } catch (error) {
            throw new Error("Problema ao deletar empresa")
        }
    }






}