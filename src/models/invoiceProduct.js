import Sequelize from "sequelize";

let invoiceProduct = (sequelize, DataTypes) => {
  class InvoiceProduct extends Sequelize.Model {}

  InvoiceProduct.init(
    {
      Date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your date",
          },
        },
      },
    },
    { sequelize, modelName: "invoiceProduct", timestamps: false }
  );

  InvoiceProduct.associate = models => {
    InvoiceProduct.belongsTo(models.employee, {
      onDelete: "SET NULL",
    });
    InvoiceProduct.hasMany(models.invoiceProduct_product);
  };

  return InvoiceProduct;
};

export default invoiceProduct;
