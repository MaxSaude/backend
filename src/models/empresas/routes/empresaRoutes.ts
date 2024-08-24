import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { empresaControllers } from "../controllers/EmpresaController";


export const empresaRoutes = (fastify: FastifyInstance,
    options: RouteShorthandOptions, done: () => void
) => {
    fastify.register(empresaControllers)
    done();
}