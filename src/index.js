import express from 'express'
import cors from 'cors'
import rootRouter from './routes/rootRouter.js'

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.static(".")) // định vị đường dẫn BE để load file

app.use(rootRouter)

app.listen(8080)
