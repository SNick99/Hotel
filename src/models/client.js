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
            msg: "Please enter your name",
          },
        },
      },
      Phone: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },

          is: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, //XXX-XXX-XXXX
        },
      },
      Birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your date",
          },
        },
      },
    },
    { sequelize, modelName: "client", timestamps: false }
  );

  Client.associate = models => {
    Client.hasMany(
      models.clientPet,

      { onDelete: "CASCADE" }
    );
    Client.hasMany(
      models.order,

      { onDelete: "CASCADE" }
    );
  };

  return Client;
};

export default client;
