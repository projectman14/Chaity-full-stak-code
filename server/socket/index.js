import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { getUSerDetailsFromToken } from '../helpers/getUserDetailsFromToken.js'
import { UserModel } from '../models/userModel.js'


const app = express()

//Socket Connetion

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: `*`,
        credentials: true
    }
})

const onlineUser = new Set()


io.on('connection', async (socket) => {

    console.log('connected user', socket.id)

    const token = socket.handshake.auth.token

    // console.log(token)

    const user = await getUSerDetailsFromToken(token)

    // console.log("user" , user)

    socket.join(user?._id)
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser' , Array.from(onlineUser))

    socket.on('message-page',async(userId)=> {
        console.log('userId' , userId)
        const userDetails = await UserModel.findById(userId).select("-password")

        const payload = {
            name : userDetails?.name,
            _id : userDetails?._id,
            email : userDetails?.email,
            online : onlineUser?.has(userId),
            profile_pic : userDetails?.profile_pic
        }

        socket.emit('message-user' , payload)
    })

    socket.on('disconnect', () => {
        onlineUser.delete(user?._id)
        console.log('disconnected user', socket.id)
    })
})

export { app, server }