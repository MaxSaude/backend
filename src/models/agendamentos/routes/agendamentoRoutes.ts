import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { agendamentoControllers } from "../controllers/AgendamentoController";


export const agendamentoRoutes = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {
    fastify.register(agendamentoControllers)
    done();
}