import Sequelize from "sequelize";

let product_order = (sequelize, DataTypes) => {
  class Product_order extends Sequelize.Model {}

  Product_order.init(
    {},
    { sequelize, modelName: "product_order", timestamps: false }
  );

  Product_order.associate = models => {
    Product_order.belongsTo(
      models.order,
      { defaultValue: 1 },
      { onDelete: "SET DEFAULT" }
    );
    Product_order.belongsTo(
      models.product,
      { defaultValue: 1 },
      { onDelete: "SET DEFAULT" }
    );
  };

  return Product_order;
};

export default product_order;
