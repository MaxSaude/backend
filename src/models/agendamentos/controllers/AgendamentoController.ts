import { FastifyInstance, RouteShorthandOptions } from "fastify";

import { UUID } from "crypto";
import { AgendamentoRepository } from "../data/repository/AgendamentoRepository";
import { AgendamentoCriacaoDto, AgendamentoUpdateDto } from "../data/entity/Agendamento";

export const agendamentoControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {

    const agendamentoRepository = new AgendamentoRepository();
    const salvarAgendamentoUseCase = new salvarAgendamentoUseCase(agendamentoRepository);
    const buscarAgendamentoPorCpfUseCase = new buscarAgendamentoPorCpfUseCase(agendamentoRepository)
    const alterarAgendamentoUseCase = new alterarAgendamentoUseCase(agendamentoRepository);
    const deletarAgendamentoUseCase = new deletarAgendamentoUseCase(agendamentoRepository)
    const buscarTodosAgendamentoUseCase = new buscarTodosAgendamentoUseCase(agendamentoRepository)


    fastify.post('/salvarAgendamento', async (request, reply) => {
        try {

            const agendamento = await salvarAgendamentoUseCase.execute(request.body as AgendamentoCriacaoDto);
            reply.code(201).send(agendamento);

        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' })
        }

    })

    fastify.get('/buscarAgendamento/:id', async (request: any, reply) => {

        try {
            console.log(request.params.id)

            const id = request.params.id;
            const agendamento = buscarAgendamentoPorNomeUseCase.execute(id);

            if (agendamento) {
                reply.code(200).send(agendamento)
            } else {
                reply.code(404).send({ erro: 'Agendamento não encontrado' })
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })
    
    fastify.get('/listarTodosAgendamento', async (request: any, reply) => {

        try {

            const agendamento =  await buscarTodosAgendamentoUseCase.execute();
            reply.code(200).send(agendamento)

        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }

    })

    fastify.put('/alterarAgendamento/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            const agendamentoAlterar = request.body as AgendamentoUpdateDto;

            const agendamentoAlterada =
                await alterarAgendamentoUseCase.execute(codigo, agendamentoAlterar)

            reply.code(200).send(agendamentoAlterada)

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' })
        }


    })

    fastify.delete('/deletarAgendamento/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            await deletarAgendamentoUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })

    done();
}