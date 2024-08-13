import fastify from "fastify";
import cors from '@fastify/cors'


const server = fastify()
const PORT = 3333;

server.register(iesRoutes)
server.register(disciplinaRoutes)
server.register(tarefaRoutes);
server.register(usuarioRoutes);
server.register(turmaRoutes)

server.register(cors, { 
    allowedHeaders: '*'
 })


server.get('/', (request, reply) => {
    return { message: 'Você está na API da CESUL' }
})

server.listen({ port: PORT}).then(() => {
    console.log("Servidor está rodando na porta " + PORT)
})