import Sequelize from "sequelize";

let cage_order = (sequelize, DataTypes) => {
  class Cage_order extends Sequelize.Model {}

  Cage_order.init(
    {},
    { sequelize, modelName: "cage_order", timestamps: false }
  );

  Cage_order.associate = models => {
    Cage_order.belongsTo(
      models.order,
      { defaultValue: 1 },
      { onDelete: "SET DEFAULT" }
    );
    Cage_order.belongsTo(
      models.cage,
      { defaultValue: 1 },
      { onDelete: "SET DEFAULT" }
    );
  };

  return Cage_order;
};

export default cage_order;
