import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import connectDB from './config/dataBase.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json({limit:'10mb'}))
const corsOption = {
    origin:['http://localhost:5173'],
    credentials:true
}
app.use(cookieParser())
app.use('/storage' , express.static('storage'))
app.use(cors(corsOption))
const PORT = process.env.PORT || 5500
app.use('/v1',router)

app.get('/',(req,res) =>{
    res.send(`Hello From Server...`)
})

app.listen(PORT, () =>{
    connectDB()
    console.log(`Server is Running on http://localhost:${PORT}`)
})