import Sequelize from "sequelize";

let services = (sequelize, DataTypes) => {
  class Services extends Sequelize.Model {}

  Services.init(
    {
      service: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    { sequelize, modelName: "services", timestamps: false }
  );

  Services.associate = models => {
    Services.belongsTo(models.order, { onDelete: "CASCADE" });
  };

  return Services;
};

export default services;
