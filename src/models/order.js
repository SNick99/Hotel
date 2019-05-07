import Sequelize from "sequelize";

let order = (sequelize, DataTypes) => {
  class Order extends Sequelize.Model {}

  Order.init(
    {
      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your date",
          },
        },
      },
      EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your date",
          },
        },
      },
    },

    { sequelize, modelName: "order", timestamps: false }
  );

  Order.associate = models => {
    Order.belongsTo(models.employee);
    Order.belongsTo(models.client);
    Order.hasMany(models.services);
    Order.hasMany(models.cageOrder, { onDelete: "CASCADE" });
    Order.hasMany(models.productOrder, { onDelete: "CASCADE" });
  };

  return Order;
};

export default order;
