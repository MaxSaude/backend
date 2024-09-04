import { FastifyInstance, RouteShorthandOptions } from "fastify";

import { UUID } from "crypto";
import { EmpresaRepository } from "../data/repository/EmpresaRepository";
import { SalvarEmpresaUseCase } from "../domain/SalvarUseCase";
import { BuscarEmpresaPorCodigoUseCase } from "../domain/BuscarPorCodigo";
import { AlterarEmpresaUseCase } from "../domain/AlterarUseCase";
import { DeletarEmpresaUseCase } from "../domain/DeletarUseCase";
import { BuscarTodasEmpresasUseCase } from "../domain/BuscarTodasEmpresas";
import { EmpresaCriacaoDto, EmpresaUpdateDto } from "../data/entity/Empresa";

export const empresaControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {

    const empresaRepository = new EmpresaRepository();
    const salvarEmpresaUseCase = new SalvarEmpresaUseCase(empresaRepository);
    const buscarEmpresaPorCodigoUseCase = new BuscarEmpresaPorCodigoUseCase(empresaRepository)
    const alterarEmpresaUseCase = new AlterarEmpresaUseCase(empresaRepository);
    const deletarEmpresaUseCase = new DeletarEmpresaUseCase(empresaRepository)
    const buscarTodasEmpresasUseCase = new BuscarTodasEmpresasUseCase(empresaRepository)


    fastify.post('/salvarEmpresa', async (request, reply) => {
        try {

            const empresa = await salvarEmpresaUseCase.execute(request.body as EmpresaCriacaoDto);
            reply.code(201).send(empresa);

        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' })
        }

    })

    fastify.get('/buscarEmpresa/:id', async (request: any, reply) => {

        try {
            console.log(request.params.id)

            const id = request.params.id;
            const empresa = buscarEmpresaPorCodigoUseCase.execute(id);

            if (empresa) {
                reply.code(200).send(empresa)
            } else {
                reply.code(404).send({ erro: 'Empresa não encontrada' })
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })
    
    fastify.get('/listarTodasEmpresas', async (request: any, reply) => {

        try {

            const empresas =  await buscarTodasEmpresasUseCase.execute();
            reply.code(200).send(empresas)

        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }

    })

    fastify.put('/alterarEmpresa/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            const empresaAlterar = request.body as EmpresaUpdateDto;

            const empresaAlterada =
                await alterarEmpresaUseCase.execute(codigo, empresaAlterar)

            reply.code(200).send(empresaAlterada)

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' })
        }


    })

    fastify.delete('/deletarEmpresa/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            await deletarEmpresaUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })

    done();
}