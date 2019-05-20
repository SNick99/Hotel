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
    InvoiceCage.belongsTo(models.employee, { onDelete: "SET NULL" });
    InvoiceCage.hasMany(models.invoiceCage_cage);
  };

  return InvoiceCage;
};

export default invoiceCage;
