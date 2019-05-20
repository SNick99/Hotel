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
                cageId: req.body.productId,
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

export default router;
