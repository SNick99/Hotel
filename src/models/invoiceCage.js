import Sequelize from "sequelize";

let invoiceCage = (sequelize, DataTypes) => {
  class InvoiceCage extends Sequelize.Model {}

  InvoiceCage.init(
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
    { sequelize, modelName: "invoiceCage", timestamps: false }
  );

  InvoiceCage.associate = models => {
    InvoiceCage.belongsTo(models.employee);
    InvoiceCage.hasMany(models.invoiceCage_cage, { onDelete: "CASCADE" });
  };

  return InvoiceCage;
};

export default invoiceCage;
