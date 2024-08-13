import { FastifyInstance, RouteShorthandOptions } from "fastify";

import { UUID } from "crypto";
import { DisciplinaRepository } from "../data/repository/DisciplinaRepository";
import { SalvarDisciplinaUseCase } from "../domain/useCases/SalvarUseCase";
import { BuscarDisciplinaPorCodigoUseCase } from "../domain/useCases/BuscarPorCodigo";
import { AlterarDisciplinaUseCase } from "../domain/useCases/AlterarUseCase";
import { DeletarDisciplinaUseCase } from "../domain/useCases/DeletarUseCase";
import { DisciplinaCriacaoDto, DisciplinaUpdateDto } from "../data/entity/Disciplina";
import { BuscarDisciplinaPorTurmaUseCase } from "../domain/useCases/BuscarPorTurma";
import { BuscarTodasDisciplinasUseCase } from "../domain/useCases/BuscarTodasDisciplinas";

export const disciplinaControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {

    const disciplinaRepository = new DisciplinaRepository();
    const salvarDisciplinaUseCase = new SalvarDisciplinaUseCase(disciplinaRepository);
    const buscarDisciplinaPorCodigoUseCase = new BuscarDisciplinaPorCodigoUseCase(disciplinaRepository)
    const buscarDisciplinasPorTurmaUseCase = new BuscarDisciplinaPorTurmaUseCase(disciplinaRepository)
    const alterarDisciplinaUseCase = new AlterarDisciplinaUseCase(disciplinaRepository);
    const deletarDisciplinaUseCase = new DeletarDisciplinaUseCase(disciplinaRepository)
    const buscarTodasDisciplinasUseCase = new BuscarTodasDisciplinasUseCase(disciplinaRepository)


    fastify.post('/salvarDisciplina', async (request, reply) => {
        try {

            const disciplina = await salvarDisciplinaUseCase.execute(request.body as DisciplinaCriacaoDto);
            reply.code(201).send(disciplina);

        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' })
        }

    })

    fastify.get('/buscarDisciplina/:id', async (request: any, reply) => {

        try {
            console.log(request.params.id)

            const id = request.params.id;
            const disciplina = buscarDisciplinaPorCodigoUseCase.execute(id);

            if (disciplina) {
                reply.code(200).send(disciplina)
            } else {
                reply.code(404).send({ erro: 'Disciplina não encontrada' })
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })

    fastify.get('/buscarDisciplinasPorTurma/:idTurma', async (request: any, reply) => {

        try {
            console.log(request.params.idTurma)

            const idTurma = request.params.idTurma;
            const disciplinas = buscarDisciplinasPorTurmaUseCase.execute(idTurma);

            reply.code(200).send(disciplinas)

        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })

    
    fastify.get('/listarTodasDisciplinas', async (request: any, reply) => {

        try {

            const disciplinas =  await buscarTodasDisciplinasUseCase.execute();
            reply.code(200).send(disciplinas)

        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }

    })

    fastify.put('/alterarDisciplina/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            const disciplinaAlterar = request.body as DisciplinaUpdateDto;

            const disciplinaAlterada =
                await alterarDisciplinaUseCase.execute(codigo, disciplinaAlterar)

            reply.code(200).send(disciplinaAlterada)

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' })
        }


    })

    fastify.delete('/deletarDisciplina/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            await deletarDisciplinaUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })


    done();


}