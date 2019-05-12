import Sequelize from "sequelize";

let employee = (sequelize, DataTypes) => {
  class Employee extends Sequelize.Model {}

  Employee.init(
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
        unique: {
          args: true,
          msg: "Phone address already in use!",
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
        },
      },
      Birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      Adress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      Position: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      SalaryChange: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },

          min: 1,
        },
      },
    },
    { sequelize, modelName: "employee", timestamps: false }
  );

  Employee.associate = models => {
    Employee.hasMany(models.schedule, { onDelete: "CASCADE" });
    Employee.hasMany(models.order, { onDelete: "CASCADE" });
  };

  return Employee;
};

export default employee;
