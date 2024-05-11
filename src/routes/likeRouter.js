import express from 'express'
import { like, unlike, getLikedByUser, getUserLikeRes } from '../controllers/liekController.js'


const likeRouter = express.Router()

likeRouter.post('/like', like);

// Unlike a restaurant
likeRouter.post('/unlike', unlike);

// Get liked restaurants by user
likeRouter.get('/likedByUser/:userId', getLikedByUser);

// Get users who liked a restaurant
likeRouter.get('/usersLikedRestaurant/:restaurantId', getUserLikeRes);

export default likeRouter