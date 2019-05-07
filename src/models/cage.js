import Sequelize from "sequelize";

let cage = (sequelize, DataTypes) => {
  class Cage extends Sequelize.Model {}

  Cage.init(
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
      KindOfCage: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your KindOfCage",
          },
        },
      },

      TypeOfCage: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your TypeOfCage",
          },
        },
      },
      PriceOfDay: {
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
    { sequelize, modelName: "cage", timestamps: false }
  );

  Cage.associate = models => {
    Cage.hasMany(models.cageOrder, { onDelete: "CASCADE" });
    Cage.hasMany(models.invoiceCage_cage, { onDelete: "CASCADE" });
  };

  return Cage;
};

export default cage;
