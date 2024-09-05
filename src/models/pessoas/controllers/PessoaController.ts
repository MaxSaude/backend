import { FastifyInstance, RouteShorthandOptions } from "fastify";

import { UUID } from "crypto";

export const pessoaControllers = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {

    const pessoaRepository = new PessoaRepository();
    const salvarEmpresaUseCase = new SalvarPessoaUseCase(pessoaRepository);
    const buscarPessoaPorCodigoUseCase = new BuscarPessoaPorCodigoUseCase(pessoaRepository)
    const alterarPessoaUseCase = new AlterarPessoaUseCase(pessoaRepository);
    const deletarPessoaUseCase = new DeletarPessoaUseCase(pessoaRepository)
    const buscarTodasPessoasUseCase = new BuscarTodasPessoasUseCase(pessoaRepository)


    fastify.post('/salvarPessoa', async (request, reply) => {
        try {

            const pessoa = await salvarPessoaUseCase.execute(request.body as PessoaCriacaoDto);
            reply.code(201).send(pessoa);

        } catch (error) {
            reply.code(500).send({ error: 'Houve algum problema ao salvar' })
        }

    })

    fastify.get('/buscarPessoa/:id', async (request: any, reply) => {

        try {
            console.log(request.params.id)

            const id = request.params.id;
            const pessoa = buscarPessoaPorCodigoUseCase.execute(id);

            if (pessoa) {
                reply.code(200).send(pessoa)
            } else {
                reply.code(404).send({ erro: 'Pessoa não encontrada' })
            }
        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }


    })
    
    fastify.get('/listarTodasPessoas', async (request: any, reply) => {

        try {

            const pessoas =  await buscarTodasPessoasUseCase.execute();
            reply.code(200).send(pessoas)

        } catch (error) {
            reply.code(500).send({ erro: 'Erro de servidor' })
        }

    })

    fastify.put('/alterarPessoa/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            const pessoaAlterar = request.body as PessoaUpdateDto;

            const pessoaAlterada =
                await alterarPessoaUseCase.execute(codigo, pessoaAlterar)

            reply.code(200).send(pessoaAlterada)

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao alterar' })
        }


    })

    fastify.delete('/deletarPessoa/:codigo', async (request, reply) => {

        try {
            const codigo = request.params.codigo as UUID;

            console.log(codigo)

            await deletarPessoaUseCase.execute(codigo)

            reply.code(204).send("Deletado com sucesso ")

        } catch (error) {
            reply.code(500).send({ erro: 'Problema ao deletar' })
        }

    })

    done();
}