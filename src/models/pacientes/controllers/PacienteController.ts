import { FastifyInstance, RouteShorthandOptions } from "fastify";

import { UUID } from "crypto";
import { SalvarPacienteUseCase } from "../domain/SalvarUseCase";
import { BuscarPacientePorCodigoUseCase } from "../domain/BuscarPorCodigoUseCase";
import { AlterarPacienteUseCase } from "../domain/AlterarUseCase";
import { DeletarPacienteUseCase } from "../domain/DeletarUseCase";
import { PacienteRepository } from "../data/repository/PacienteRepository";
import { PacienteCriacaoDto, PacienteUpdateDto } from "../data/entity/Paciente";
import { BuscarTodosPacientesUseCase } from "../domain/BuscarTodosPacientesUseCase";

export const pacienteControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {

    const pacienteRepository = new PacienteRepository();
    const salvarPacienteUseCase = new SalvarPacienteUseCase(pacienteRepository);
    const buscarPacientePorCodigoUseCase = new BuscarPacientePorCodigoUseCase(pacienteRepository)
    const alterarPacienteUseCase = new AlterarPacienteUseCase(pacienteRepository);
    const deletarPacienteUseCase = new DeletarPacienteUseCase(pacienteRepository)
    const buscarTodosPacientesUseCase = new BuscarTodosPacientesUseCase(pacienteRepository)


    fastify.post('/salvarPaciente', async (request, reply) => {
        try {

            const paciente = await salvarPacienteUseCase.execute(request.body as PacienteCriacaoDto);
            reply.code(201).send(paciente);

        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' })
        }

    })

    fastify.get('/buscarPaciente/:id', async (request: any, reply) => {

        try {
            console.log(request.params.id)

            const id = request.params.id;
            const paciente = buscarPacientePorCodigoUseCase.execute(id);

            if (paciente) {
                reply.code(200).send(paciente)
            } else {
                reply.code(404).send({ erro: 'Paciente não encontrado' })
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })
    
    fastify.get('/listarTodosPacientes', async (request: any, reply) => {

        try {

            const pacientes =  await buscarTodosPacientesUseCase.execute();
            reply.code(200).send(pacientes)

        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }

    })

    fastify.put('/alterarPaciente/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            const pacienteAlterar = request.body as PacienteUpdateDto;

            const pacienteAlterada =
                await alterarPacienteUseCase.execute(codigo, pacienteAlterar)

            reply.code(200).send(pacienteAlterada)

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' })
        }


    })

    fastify.delete('/deletarPaciente/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            await deletarPacienteUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })

    done();
}