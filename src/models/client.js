import Sequelize from "sequelize";

let client = (sequelize, DataTypes) => {
  class Client extends Sequelize.Model {}

  Client.init(
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
      LastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your LastName",
          },
        },
      },
      Phone: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your Phone",
          },

          is: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, //XXX-XXX-XXXX
        },
        unique: {
          args: true,
          msg: "Phone  already in use!",
        },
      },
      Birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your Birthday",
          },
        },
      },
    },
    { sequelize, modelName: "client", timestamps: false }
  );

  Client.associate = models => {
    Client.hasMany(models.clientPet);
    Client.hasMany(models.order);
  };

  return Client;
};

export default client;
