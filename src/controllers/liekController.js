import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';


const model = initModels(sequelize)
const LikeRestaurant = model.like_restaurant

async function likeRestaurant(userId, restaurantId) {
    try {
        const like = await LikeRestaurant.create({
            user_id: userId,
            res_id: restaurantId,
            date_like: new Date()
        });
        return like;
    } catch (error) {
        throw new Error('Failed to like the restaurant');
    }
}

// Unlike a restaurant
async function unlikeRestaurant(userId, restaurantId) {
    try {
        await LikeRestaurant.destroy({
            where: {
                user_id: userId,
                res_id: restaurantId
            }
        });
        return true;
    } catch (error) {
        throw new Error('Failed to unlike the restaurant');
    }
}

// Get liked restaurants by user
async function getLikedRestaurantsByUser(userId) {
    try {
        const likedRestaurants = await LikeRestaurant.findAll({
            where: {
                user_id: userId
            }
        });
        return likedRestaurants;
    } catch (error) {
        throw new Error('Failed to get liked restaurants by user');
    }
}

// Get users who liked a restaurant
async function getUsersLikedRestaurant(restaurantId) {
    try {
        const usersLiked = await LikeRestaurant.findAll({
            where: {
                res_id: restaurantId
            }
        });
        return usersLiked;
    } catch (error) {
        throw new Error('Failed to get users who liked the restaurant');
    }
}


const like = async (req, res) => {
    const { userId, restaurantId } = req.body;
    try {
        const like = await likeRestaurant(userId, restaurantId);
        res.json(like);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Unlike a restaurant
const unlike = async (req, res) => {
    const { userId, restaurantId } = req.body;
    try {
        const unlike = await unlikeRestaurant(userId, restaurantId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get liked restaurants by user
const getLikedByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const likedRestaurants = await getLikedRestaurantsByUser(userId);
        res.json(likedRestaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get users who liked a restaurant
const getUserLikeRes = async (req, res) => {
    const { restaurantId } = req.params;
    try {
        const usersLiked = await getUsersLikedRestaurant(restaurantId);
        res.json(usersLiked);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    like, unlike, getLikedByUser, getUserLikeRes
}