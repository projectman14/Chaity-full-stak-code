import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'


const app = express()

//Socket Connetion

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
})


io.on('connection', (socket) => {

    console.log('connected user', socket.id)

    io.on('disconnect', () => {
        console.log('disconnected user', socket.id)
    })
})

export { app, server }