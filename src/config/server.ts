import fastify from "fastify";
import cors from '@fastify/cors'
import { empresaRoutes } from "../models/empresas/routes/empresaRoutes";


const server = fastify()
const PORT = 3333;

server.register(empresaRoutes)


server.register(cors, { 
    allowedHeaders: '*'
 })


server.get('/', (request, reply) => {
    return { message: 'Você está na API da CESUL' }
})

server.listen({ port: PORT}).then(() => {
    console.log("Servidor está rodando na porta " + PORT)
})