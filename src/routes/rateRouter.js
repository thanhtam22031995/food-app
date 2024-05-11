
import express from 'express'
import { addRate, getRatesByRestaurant, getRatesByUser } from '../controllers/rateController.js'
const rateRouter = express.Router()

// Thêm đánh giá cho nhà hàng
rateRouter.post('/addRate', addRate);

// Lấy danh sách đánh giá theo nhà hàng
rateRouter.get('/getRatesByRestaurant/:res_id', getRatesByRestaurant);

// Lấy danh sách đánh giá theo người dùng
rateRouter.get('/getRatesByUser/:user_id', getRatesByUser);

export default rateRouter