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
            msg: "Please enter your Name",
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
          msg: "Phone address already in use!",
        },
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your Password",
          },
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
      Adress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your Adress",
          },
        },
      },
      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your StartDate",
          },
        },
      },
      Position: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your Position",
          },
        },
      },
      SalaryChange: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your SalaryChange",
          },

          min: 1,
        },
      },
    },
    { sequelize, modelName: "employee", timestamps: false }
  );

  Employee.associate = models => {
    Employee.hasMany(models.schedule);
    Employee.hasMany(models.order);
  };

  return Employee;
};

export default employee;
