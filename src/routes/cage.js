import { Router } from "express";
import moment from "moment";
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const Today = moment().format("YYYY-MM-DD");
console.log(Today);
//@route POST cage/addCage
//@desc add cage
//@access Private
router.post("/addCage", (req, res) => {
  req.context.models.cage
    .findOne({
      where: {
        NameFirma: req.body.NameFirma,
        TypeOfCage: req.body.TypeOfCage,
        KindOfCage: req.body.KindOfCage,
      },
      include: [
        {
          model: req.context.models.invoiceCage_cage,
          include: [
            {
              model: req.context.models.invoiceCage,
              where: {
                Date: Today,
              },
            },
          ],
        },
      ],
    })
    .then(cage => {
      res.send(cage);
      //if cage is true and date is today###############
      if (cage) {
        //add to db table invoiceCage_cages
        req.context.models.invoiceCage_cage.create({
          Amount: req.body.Amount,
          UnitPrice: req.body.UnitPrice,
          cageId: cage.id,
          invoiceCageId: cage.invoiceCage_cages[0].invoiceCage.id,
        });
        //if cage is false and date is today##################
      } else {
        //add to db table cage
        return Promise.all([
          req.context.models.cage.create({
            NameFirma: req.body.NameFirma,
            TypeOfCage: req.body.TypeOfCage,
            KindOfCage: req.body.KindOfCage,
            PriceOfDay: req.body.PriceOfDay,
          }),

          req.context.models.invoiceCage
            .findOne({
              where: { Date: Today },
            })
            .then(day => {
              if (day) {
                return day;
              } else {
                //add to db table invoiceCage
                return req.context.models.invoiceCage.create({
                  Date: Today,
                  employeeId: req.body.employeeId,
                });
              }
            }),
        ]).then(result => {
          //add to db table invoiceCage_cages
          req.context.models.invoiceCage_cage.create({
            Amount: req.body.Amount,
            UnitPrice: req.body.UnitPrice,
            cageId: result[0].id,
            invoiceCageId: result[1].id,
          });
        });
      }
    });
});

export default router;
