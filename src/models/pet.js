import Sequelize from "sequelize";

let pet = (sequelize, DataTypes) => {
  class Pet extends Sequelize.Model {}

  Pet.init(
    {
      FirstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },

      PassportCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },

      KindOfPet: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
          is: /[A-Za-z]/,
        },
      },
    },
    { sequelize, modelName: "pet", timestamps: false }
  );

  Pet.associate = models => {
    Pet.hasMany(models.clientPet);
  };

  return Pet;
};

export default pet;
