import { Router } from "express";
const router = Router();
const passport = require("passport");
import moment from "moment";
const Today = moment().format("YYYY-MM-DD");

import Sequelize from "sequelize";
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

//@route POST order/addOrder
//@desc add order
//@access Private
router.post(
  "/addOrder",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.client
      .findOne({
        where: { id: req.body.clientId },
        include: [
          {
            model: req.context.models.clientPet,
            where: { petId: req.body.petId },
          },
        ],
      })
      .then(pet => {
        if (pet) {
          req.context.models.order
            .create({
              StartDate: Today,
              EndDate: req.body.EndDate,
              employeeId: req.body.employeeId,
              clientId: req.body.clientId,
            })
            .then(order => {
              req.context.models.productOrder
                .create({
                  orderId: order.id,
                  productId: req.body.productId,
                })
                .then(() => {
                  req.context.models.cageOrder
                    .create({
                      orderId: order.id,
                      cageId: req.body.cageId,
                    })
                    .then(() => {
                      req.context.models.services.create({
                        orderId: order.id,
                        service: req.body.service || "Без доп. услуги",
                        price: req.body.price || 0,
                      });
                    });
                });
            });
        } else {
          res.status(500).send({ Pet: "У клиента нет такого животного!" });
          console.log(`
           #################################
           У этого клиента нет такого животного
           №№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№№
          `);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);

//@route GET order/addOrder
//@desc get info for add order
//@access Private
router.get(
  "/addOrder",

  (req, res) => {
    sequelize
      .query(
        `--CREATE OR REPLACE FUNCTION Date_Check_F1() RETURNS TRIGGER
         --AS $$
        -- declare
        -- BEGIN
        -- IF (NEW."EndDate" < CURRENT_DATE)
        -- THEN RAISE EXCEPTION
        -- 'Отрицательная дата, давай по новой';
        -- END IF;
        --  RETURN NEW;
        -- END;
        --  $$ LANGUAGE plpgSQL;
          --DROP TRIGGER Date_Check1 ON orders;
        --  CREATE TRIGGER Date_Check1 BEFORE INSERT OR UPDATE ON orders
        --  FOR EACH ROW EXECUTE PROCEDURE Date_Check_F1();
          `,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(users => {
        console.log(users);
      });
    const sendData = {};
    req.context.models.employee
      .findAll()
      .then(projects => {
        sendData.Employee = projects.map(item => {
          return {
            id: item.id,
            FirstName: item.FirstName,
            LastName: item.LastName,
            Phone: item.Phone,
          };
        });
      })
      .then(() => {
        req.context.models.client.findAll().then(projects => {
          sendData.Client = projects.map(item => {
            return {
              id: item.id,
              FirstName: item.FirstName,
              LastName: item.LastName,
              Phone: item.Phone,
            };
          });
        });
      })
      .then(() => {
        req.context.models.cage.findAll().then(projects => {
          sendData.Cage = projects.map(item => {
            return {
              id: item.id,
              KindOfCage: item.KindOfCage,
              NameFirma: item.NameFirma,
              TypeOfCage: item.TypeOfCage,
            };
          });
        });
      })
      .then(() => {
        req.context.models.product.findAll().then(projects => {
          sendData.Product = projects.map(item => {
            return {
              id: item.id,
              NameFirma: item.NameFirma,
              NameOfProduct: item.NameOfProduct,
            };
          });
        });
      })
      .then(() => {
        req.context.models.pet.findAll().then(projects => {
          sendData.Pet = projects.map(item => {
            return {
              id: item.id,
              NamePet: item.NamePet,
              PassportCode: item.PassportCode,
            };
          });
          res.send(sendData);
        });
      });
  }
);

//@route GET order/allOrders
//@desc get clients
//@access Private
router.get(
  "/allOrders",

  (req, res) => {
    req.context.models.order
      .findAll({
        include: [
          {
            model: req.context.models.client,
            include: [
              {
                model: req.context.models.clientPet,
                include: [{ model: req.context.models.pet }],
              },
            ],
          },
          {
            model: req.context.models.employee,
          },
          {
            model: req.context.models.services,
          },
          {
            model: req.context.models.cageOrder,
            include: [{ model: req.context.models.cage }],
          },
          {
            model: req.context.models.productOrder,
            include: [{ model: req.context.models.product }],
          },
        ],
      })
      .then(projects => {
        const sendData = projects.map(item => {
          return {
            id: item.id,
            StartDate: item.StartDate,
            EndDate: item.EndDate,
            ClientName: item.client.FirstName,
            ClientPhone: item.client.Phone,
            // NamePet: item.client.client_pets[0].pet.NamePet,
            // KindOfPet: item.client.client_pets[0].pet.KindOfPet,
            EmployeeName: item.employee.FirstName,
            // EmployeePhone: item.employee.Phone,
            // NameFirmaCage: item.cage_orders[0].cage.NameFirma,
            KindOfCage: item.cage_orders[0].cage.KindOfCage,
            // NameFirmaProduct: item.product_orders[0].product.NameFirma,
            NameOfProduct: item.product_orders[0].product.NameOfProduct,
            service: item.services[0].service,
            TotalSum:
              item.services[0].price +
              item.cage_orders[0].cage.PriceOfDay +
              item.product_orders[0].product.PriceOfUnit,
          };
        });
        return res.send(sendData);
      });
  }
);

//@route DELETE order/allOrders
//@desc Return all orders and delete one
//@access Private
router.delete(
  "/allOrders/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.order
      .destroy({ where: { id: req.params.id } })
      .then(order => {
        console.log(`Product удален? 1 means yes, 0 means no: ${order}`);
        return req.context.models.order
          .findAll({
            include: [
              {
                model: req.context.models.client,
                include: [
                  {
                    model: req.context.models.clientPet,
                    include: [{ model: req.context.models.pet }],
                  },
                ],
              },
              {
                model: req.context.models.employee,
              },
              {
                model: req.context.models.services,
              },
              {
                model: req.context.models.cageOrder,
                include: [{ model: req.context.models.cage }],
              },
              {
                model: req.context.models.productOrder,
                include: [{ model: req.context.models.product }],
              },
            ],
          })
          .then(projects => {
            const sendData = projects.map(item => {
              return {
                id: item.id,
                StartDate: item.StartDate,
                EndDate: item.EndDate,
                ClientName: item.client.FirstName,
                ClientPhone: item.client.Phone,
                // NamePet: item.client.client_pets[0].pet.NamePet,
                // KindOfPet: item.client.client_pets[0].pet.KindOfPet,
                EmployeeName: item.employee.FirstName,
                // EmployeePhone: item.employee.Phone,
                // NameFirmaCage: item.cage_orders[0].cage.NameFirma,
                KindOfCage: item.cage_orders[0].cage.KindOfCage,
                // NameFirmaProduct: item.product_orders[0].product.NameFirma,
                NameOfProduct: item.product_orders[0].product.NameOfProduct,
                service: item.services[0].service,
                TotalSum:
                  item.services[0].price +
                  item.cage_orders[0].cage.PriceOfDay +
                  item.product_orders[0].product.PriceOfUnit,
              };
            });
            return res.send(sendData);
          });
      });
  }
);

export default router;
