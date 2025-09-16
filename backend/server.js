import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes/routes.js'
import connectDB from './config/dataBase.js'

const app = express()
app.use(express.json())
const corsOption = {
    origin:['http://localhost:5173']
}
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