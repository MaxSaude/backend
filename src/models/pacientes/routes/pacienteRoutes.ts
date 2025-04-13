import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { pacienteControllers } from "../controllers/PacienteController";


export const pacienteRoutes = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {
    fastify.register(pacienteControllers)
    done();
}