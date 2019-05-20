import Sequelize from "sequelize";

let invoiceCage_cage = (sequelize, DataTypes) => {
  class InvoiceCage_cage extends Sequelize.Model {}

  InvoiceCage_cage.init(
    {
      Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your PriceOfDay",
          },

          min: 1,
        },
      },

      UnitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your PriceOfDay",
          },

          min: 1,
        },
      },
    },
    { sequelize, modelName: "invoiceCage_cage", timestamps: false }
  );

  InvoiceCage_cage.associate = models => {
    InvoiceCage_cage.belongsTo(models.invoiceCage);
    InvoiceCage_cage.belongsTo(models.cage, { onDelete: "SET NULL" });
  };

  return InvoiceCage_cage;
};

export default invoiceCage_cage;
