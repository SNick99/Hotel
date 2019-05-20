import Sequelize from "sequelize";

let client_pet = (sequelize, DataTypes) => {
  class Client_Pet extends Sequelize.Model {}

  Client_Pet.init(
    {},
    { sequelize, modelName: "client_pet", timestamps: false }
  );

  Client_Pet.associate = models => {
    Client_Pet.belongsTo(models.client, { onDelete: "CASCADE" });
    Client_Pet.belongsTo(models.pet, { onDelete: "CASCADE" });
  };

  return Client_Pet;
};

export default client_pet;
