import { Router } from "express";
const router = Router();
const passport = require("passport");
import moment from "moment";
const Today = moment().format("YYYY-MM-DD");

//@route POST order/addOrder
//@desc add order
//@access Private
router.post(
  "/addOrder",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
                  service: req.body.service,
                  price: req.body.price,
                });
              });
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
            StartDate: item.StartDate,
            EndDate: item.EndDate,
            ClientName: item.client.FirstName,
            ClientPhone: item.client.Phone,
            ClientPhone: item.client.Phone,
            NamePet: item.client.client_pets[0].NamePet,
            KindOfPet: item.client.client_pets[0].KindOfPet,
            EmployeeName: item.employee.FirstName,
            EmployeePhone: item.employee.Phone,
            NameFirmaCage: item.cage_orders[0].cage.NameFirma,
            KindOfCage: item.cage_orders[0].cage.KindOfCage,
            NameFirmaProduct: item.product_orders[0].product.NameFirma,
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

export default router;
