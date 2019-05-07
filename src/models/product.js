import Sequelize from "sequelize";

let product = (sequelize, DataTypes) => {
  class Product extends Sequelize.Model {}

  Product.init(
    {
      NameFirma: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your NameFirma",
          },
        },
      },
      NameOfProduct: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your NameOfProduct",
          },
        },
      },
      PriceOfUnit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your PriceOfUnit",
          },

          min: 1,
        },
      },
    },
    { sequelize, modelName: "product", timestamps: false }
  );

  Product.associate = models => {
    Product.hasMany(models.productOrder, { onDelete: "CASCADE" });
    Product.hasMany(models.invoiceProduct_product, { onDelete: "CASCADE" });
  };

  return Product;
};

export default product;
