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
    Order.belongsTo(
      models.employee,
      { defaultValue: 1 },
      { onDelete: "SET DEFAULT" }
    );
    Order.belongsTo(
      models.client,
      { defaultValue: 1 },
      { onDelete: "SET DEFAULT" }
    );
    Order.hasMany(models.services);
    Order.hasMany(models.cageOrder);
    Order.hasMany(models.productOrder);
  };

  return Order;
};

export default order;
