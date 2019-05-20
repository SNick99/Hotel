import Sequelize from "sequelize";
let schedule = (sequelize, DataTypes) => {
  class Schedule extends Sequelize.Model {}

  Schedule.init(
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      DateChange: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your date",
          },
        },
      },
    },
    { sequelize, modelName: "schedule", timestamps: false }
  );

  Schedule.associate = models => {
    Schedule.belongsTo(models.employee, { onDelete: "CASCADE" });
  };

  return Schedule;
};

export default schedule;
