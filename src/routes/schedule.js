import { Router } from "express";
const router = Router();
const passport = require("passport");
const moment = require("moment");
import Sequelize from "sequelize";
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

//@route POST schedule/addSchedule
//@desc add schedule
//@access Private
router.post(
  "/addSchedule",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.schedule
      .findOne({
        where: {
          DateChange: moment(req.body.DateChange).format("YYYY-MM-DD"),
          employeeId: req.body.employeeId,
        },
      })
      .then(item => {
        if (item) {
          res.status(500).send("Работник уже был добавлен на эту дату");
        } else {
          req.context.models.schedule
            .create({
              DateChange: req.body.DateChange,
              employeeId: req.body.employeeId,
            })
            .then(() => {
              res.send("Добавили в график");
            });
        }
      });
  }
);

//@route GET schedule/allSchedules
//@desc get schedules
//@access Private
router.get(
  "/addSchedule",

  (req, res) => {
    sequelize
      .query(
        `--CREATE OR REPLACE FUNCTION Date_Check_F() RETURNS TRIGGER
         --AS $$
         --declare
         --BEGIN
         --IF (NEW."DateChange" < CURRENT_DATE)
         --THEN RAISE EXCEPTION
         --'Отрицательная дата, давай по новой';
         --END IF;
         -- RETURN NEW;
         --END;
         -- $$ LANGUAGE plpgSQL;
         -- DROP TRIGGER Date_Check ON schedules;
         -- CREATE TRIGGER Date_Check BEFORE INSERT OR UPDATE ON schedules
         -- FOR EACH ROW EXECUTE PROCEDURE Date_Check_F();
          `,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(users => {
        console.log(users);
      });

    req.context.models.employee.findAll().then(projects => {
      const sendData = projects.map(item => {
        return {
          id: item.id,
          FirstName: item.FirstName,
          LastName: item.LastName,
          Phone: item.Phone,
        };
      });

      return res.send(sendData);
    });
  }
);

//@route GET schedule/allSchedules
//@desc get schedules
//@access Private
router.get(
  "/allSchedules",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    req.context.models.schedule
      .findAll({
        include: [
          {
            model: req.context.models.employee,
          },
        ],
      })
      .then(projects => {
        const sendData = projects.map(item => {
          return {
            id: item.id,
            FirstName: item.employee.FirstName,
            LastName: item.employee.LastName,
            Phone: item.employee.Phone,
            DateChange: item.DateChange,
          };
        });
        return res.send(sendData);
      });
  }
);

//@route DELETE schedule/allSchedules/:id
//@desc Return allSchedules and delete one
//@access Private
router.delete(
  "/allSchedules/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.schedule
      .destroy({ where: { id: req.params.id } })
      .then(schedule => {
        console.log(`Клетка удалена? 1 means yes, 0 means no: ${schedule}`);
        return req.context.models.schedule
          .findAll({
            include: [
              {
                model: req.context.models.employee,
              },
            ],
          })
          .then(projects => {
            const sendData = projects.map(item => {
              return {
                id: item.id,
                FirstName: item.employee.FirstName,
                LastName: item.employee.LastName,
                Phone: item.employee.Phone,
                DateChange: item.DateChange,
              };
            });
            return res.send(sendData);
          });
      });
  }
);

//@route UPDATE schedule/allSchedules/:id
//@desc Return allSchedules and update one
//@access Private
router.put(
  "/allSchedules/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.schedule
      .findOne({
        where: { id: req.params.id },
      })
      .then(schedule => {
        schedule
          .update({
            DateChange: req.body.DateChange,
          })
          .then(() => {
            return req.context.models.schedule
              .findAll({
                include: [
                  {
                    model: req.context.models.employee,
                  },
                ],
              })
              .then(projects => {
                const sendData = projects.map(item => {
                  return {
                    id: item.id,
                    FirstName: item.employee.FirstName,
                    LastName: item.employee.LastName,
                    Phone: item.employee.Phone,
                    DateChange: item.DateChange,
                  };
                });
                return res.send(sendData);
              });
          });
      });
  }
);

export default router;
