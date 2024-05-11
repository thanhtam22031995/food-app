// Nơi định nghĩa API
import express from 'express'
import { addOrder } from '../controllers/resController.js'


const resRouter = express.Router()

resRouter.post('/addOrder', addOrder);

export default resRouter