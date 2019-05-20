import Sequelize from "sequelize";

let pet = (sequelize, DataTypes) => {
  class Pet extends Sequelize.Model {}

  Pet.init(
    {
      NamePet: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your NamePet",
          },
        },
      },

      PassportCode: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your PassportCode",
          },
        },
        unique: {
          args: true,
          msg: "PassportCode already in use!",
        },
      },

      KindOfPet: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your KindOfPet",
          },
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
