import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';


const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
import fs from 'fs';
app.use((req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFileSync('server.log', log);
  console.log(log.trim());
  next();
})
await connectDB()

app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.get('/', (req, res) => {
  res.send('API Working!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
