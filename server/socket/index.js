import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { getUSerDetailsFromToken } from '../helpers/getUserDetailsFromToken.js'
import { UserModel } from '../models/userModel.js'
import { ConversationModel, MessageModel } from '../models/conversationModel.js'
import { getConversation } from '../helpers/getConversation.js'


const app = express()
const allowedOrigins = ['https://chatify-dusky-three.vercel.app'];

//Socket Connetion

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://chatify-dusky-three.vercel.app', // Your frontend's URL
        credentials: true,
    }
})

const onlineUser = new Set()


io.on('connection', async (socket) => {

    console.log('connected user', socket.id)

    const token = socket.handshake.auth.token

    // console.log(token)

    const user = await getUSerDetailsFromToken(token)

    // console.log("user" , user)

    socket.join(user?._id?.toString())
    onlineUser.add(user?._id?.toString())

    io.emit('onlineUser', Array.from(onlineUser))

    socket.on('message-page', async (userId) => {
        console.log('userId', userId)
        const userDetails = await UserModel.findById(userId).select("-password")

        const payload = {
            name: userDetails?.name,
            _id: userDetails?._id,
            email: userDetails?.email,
            online: onlineUser?.has(userId),
            profile_pic: userDetails?.profile_pic
        }

        socket.emit('message-user', payload)

        //get previous message
        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: userId },
                { sender: userId, receiver: user?._id }
            ]
        }).populate('messages').sort({ updatedAt: -1 })

        socket.emit('message', getConversationMessage?.messages || [])
    })

    socket.on('new message', async (data) => {

        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        })

        if (!conversation) {
            const createConversation = await ConversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await createConversation.save()

        }

        const message = new MessageModel({
            text: data.text,
            imageUrl: data.imageUrl,
            videoUrl: data.videoUrl,
            msgByUserId: data?.msgByUserId,
        })
        const saveMessage = await message.save()

        const updateConversation = await ConversationModel.updateOne({ _id: conversation?._id }, {
            "$push": { messages: saveMessage?._id }
        })

        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        }).populate('messages').sort({ updatedAt: -1 })

        io.to(data?.sender).emit('message', getConversationMessage?.messages || [])
        io.to(data?.receiver).emit('message', getConversationMessage?.messages || [])

        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation', conversationSender)
        io.to(data?.receiver).emit('conversation', conversationReceiver)

    })

    socket.on('sidebar', async (currentUserId) => {
        console.log("current user", currentUserId)

        const conversation = await getConversation(currentUserId)

        socket.emit('conversation', conversation)

    })

    socket.on('seen', async (msgByUserId) => {

        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: msgByUserId },
                { sender: msgByUserId, receiver: user?._id }
            ]
        })

        const conversationMessageId = conversation?.messages || []

        const updateMessages = await MessageModel.updateMany(
            { _id: { "$in": conversationMessageId }, msgByUserId: msgByUserId },
            { "$set": { seen: true } }
        )

        //send conversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(msgByUserId)

        io.to(user?._id?.toString()).emit('conversation', conversationSender)
        io.to(msgByUserId).emit('conversation', conversationReceiver)
    })

    socket.on('disconnect', () => {
        onlineUser.delete(user?._id)
        console.log('disconnected user', socket.id)
    })
})

export { app, server }