import Sequelize from "sequelize";

let services = (sequelize, DataTypes) => {
  class Services extends Sequelize.Model {}

  Services.init(
    {
      service: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your service",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your price",
          },

          min: 1,
        },
      },
    },

    { sequelize, modelName: "services", timestamps: false }
  );

  Services.associate = models => {
    Services.belongsTo(models.order);
  };

  return Services;
};

export default services;
