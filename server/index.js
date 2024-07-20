import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { main } from './config/connectDB.js'
import { router } from './routes/index.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).json({ type: 'sucess' })
})

app.use('/api' , router)

main().then(() => {
    app.listen(PORT, () => {
        console.log('server started at ' + PORT)
    })
})

