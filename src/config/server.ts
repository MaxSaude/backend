import fastify from "fastify";
import cors from '@fastify/cors'
import { empresaRoutes } from "../models/empresas/routes/empresaRoutes";
import { agendamentoRoutes } from "../models/agendamentos/routes/agendamentoRoutes";
import { pacienteRoutes } from "../models/pacientes/routes/pacienteRoutes";


const server = fastify()
const PORT = 3333;

server.register(empresaRoutes)
server.register(agendamentoRoutes)
server.register(pacienteRoutes)


server.register(cors, { 
    allowedHeaders: '*'
 })


server.get('/', (request, reply) => {
    return { message: 'Você está na API do Gabriel' }
})

server.listen({ port: PORT}).then(() => {
    console.log("Servidor está rodando na porta " + PORT)
})