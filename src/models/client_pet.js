import Sequelize from "sequelize";

let client_pet = (sequelize, DataTypes) => {
  class Client_Pet extends Sequelize.Model {}

  Client_Pet.init(
    {},
    { sequelize, modelName: "client_pet", timestamps: false }
  );

  Client_Pet.associate = models => {
    Client_Pet.belongsTo(models.client);
    Client_Pet.belongsTo(models.pet);
  };

  return Client_Pet;
};

export default client_pet;
