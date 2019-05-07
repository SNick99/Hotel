import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

const models = {
  employee: sequelize.import("./employee"), //сотрудник
  schedule: sequelize.import("./schedule"), //график
  client: sequelize.import("./client"), //клиент
  pet: sequelize.import("./pet"), //животное
  clientPet: sequelize.import("./client_pet"), //таблица для формализации клиент-животное
  order: sequelize.import("./order"), //заказ
  services: sequelize.import("./services"), //заказ
  cage: sequelize.import("./cage"), //клетка
  cageOrder: sequelize.import("./cage_order"), //таблица для формализации заказ-клетка
  invoiceCage: sequelize.import("./invoiceCage"), //накладная на клетки
  invoiceCage_cage: sequelize.import("./invoiceCage_cage"), //таблица для формализации накладная на клетки - клетка
  product: sequelize.import("./product"), //продукт
  productOrder: sequelize.import("./product_order"), //таблица для формализации заказ-продукт
  invoiceProduct: sequelize.import("./invoiceProduct"), //накладная на продукты
  invoiceProduct_product: sequelize.import("./invoiceProduct_product"), //таблица для формализации накладная на продукт - продукт
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
    console.log(models[key], models);
  }
});

export { sequelize };

export default models;
