import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _food from  "./food.js";
import _food_type from  "./food_type.js";
import _like_restaurant from  "./like_restaurant.js";
import _order_food from  "./order_food.js";
import _rate_restaurant from  "./rate_restaurant.js";
import _restaurant from  "./restaurant.js";
import _sub_food from  "./sub_food.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const food = _food.init(sequelize, DataTypes);
  const food_type = _food_type.init(sequelize, DataTypes);
  const like_restaurant = _like_restaurant.init(sequelize, DataTypes);
  const order_food = _order_food.init(sequelize, DataTypes);
  const rate_restaurant = _rate_restaurant.init(sequelize, DataTypes);
  const restaurant = _restaurant.init(sequelize, DataTypes);
  const sub_food = _sub_food.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  order_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(order_food, { as: "order_foods", foreignKey: "food_id"});
  sub_food.belongsTo(food, { as: "food", foreignKey: "food_id"});
  food.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id"});
  food.belongsTo(food_type, { as: "type", foreignKey: "type_id"});
  food_type.hasMany(food, { as: "foods", foreignKey: "type_id"});
  like_restaurant.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(like_restaurant, { as: "like_restaurants", foreignKey: "res_id"});
  rate_restaurant.belongsTo(restaurant, { as: "re", foreignKey: "res_id"});
  restaurant.hasMany(rate_restaurant, { as: "rate_restaurants", foreignKey: "res_id"});
  like_restaurant.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(like_restaurant, { as: "like_restaurants", foreignKey: "user_id"});
  order_food.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(order_food, { as: "order_foods", foreignKey: "user_id"});
  rate_restaurant.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rate_restaurant, { as: "rate_restaurants", foreignKey: "user_id"});

  return {
    food,
    food_type,
    like_restaurant,
    order_food,
    rate_restaurant,
    restaurant,
    sub_food,
    users,
  };
}
