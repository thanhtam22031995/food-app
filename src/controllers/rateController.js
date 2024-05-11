
import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';


const model = initModels(sequelize)
const RateRestaurant = model.rate_restaurant

// Thêm đánh giá cho nhà hàng
async function addRateHandler(user_id, res_id, amount) {
    try {
        const rate = await RateRestaurant.create({
            user_id: user_id,
            res_id: res_id,
            amount: amount,
            date_rate: new Date()
        });
        return rate;
    } catch (error) {
        throw new Error('Failed to add rate for restaurant');
    }
}

// Lấy danh sách đánh giá theo nhà hàng
async function getRatesByRestaurantHandler(res_id) {
    try {
        const rates = await RateRestaurant.findAll({
            where: {
                res_id: res_id
            }
        });
        return rates;
    } catch (error) {
        throw new Error('Failed to get rates for restaurant');
    }
}

// Lấy danh sách đánh giá theo người dùng
async function getRatesByUserHandler(user_id) {
    try {
        const rates = await RateRestaurant.findAll({
            where: {
                user_id: user_id
            }
        });
        return rates;
    } catch (error) {
        throw new Error('Failed to get rates for user');
    }
}


const addRate = async (req, res) => {
    const { user_id, res_id, amount } = req.body;
    try {
        const rate = await addRateHandler(user_id, res_id, amount);
        res.json(rate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRatesByRestaurant = async (req, res) => {
    const { res_id } = req.params;
    try {
        const rates = await getRatesByRestaurantHandler(res_id);
        res.json(rates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRatesByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const rates = await getRatesByUserHandler(user_id);
        res.json(rates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    addRate, getRatesByRestaurant, getRatesByUser
}