import Sequelize from "sequelize";

let invoiceProduct_product = (sequelize, DataTypes) => {
  class InvoiceProduct_product extends Sequelize.Model {}

  InvoiceProduct_product.init(
    {
      Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your Amount",
          },

          min: 1,
        },
      },

      UnitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your UnitPrice",
          },

          min: 1,
        },
      },
    },
    { sequelize, modelName: "invoiceProduct_product", timestamps: false }
  );

  InvoiceProduct_product.associate = models => {
    InvoiceProduct_product.belongsTo(models.invoiceProduct);
    InvoiceProduct_product.belongsTo(models.product, { onDelete: "SET NULL" });
  };

  return InvoiceProduct_product;
};

export default invoiceProduct_product;
