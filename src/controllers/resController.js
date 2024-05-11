import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';


const model = initModels(sequelize)
const OrderFood = model.order_food

async function addOrderHandler(userId, foodId, amount, code, arrSubId) {
    try {
        const order = await OrderFood.create({
            user_id: userId,
            food_id: foodId,
            amount: amount,
            code: code,
            arr_sub_id: arrSubId
        });
        return order;
    } catch (error) {
        throw new Error('Failed to add order');
    }
}

const addOrder = async (req, res) => {
    const { userId, foodId, amount, code, arrSubId } = req.body;
    try {
        const order = await addOrderHandler(userId, foodId, amount, code, arrSubId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addOrder };
