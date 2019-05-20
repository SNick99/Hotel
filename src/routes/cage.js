import { Router } from "express";
import moment from "moment";
const router = Router();
const passport = require("passport");

const Today = moment().format("YYYY-MM-DD");

console.log(Today);
//@route POST cage/addCage
//@desc add cage
//@access Private
router.post(
  "/addCage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
            req.context.models.cage
              .findOne({
                where: {
                  NameFirma: req.body.NameFirma,
                  TypeOfCage: req.body.TypeOfCage,
                  KindOfCage: req.body.KindOfCage,
                },
              })
              .then(cage => {
                if (cage) {
                  return cage;
                } else {
                  //add to db table cage
                  return req.context.models.cage.create({
                    NameFirma: req.body.NameFirma,
                    TypeOfCage: req.body.TypeOfCage,
                    KindOfCage: req.body.KindOfCage,
                    PriceOfDay: req.body.PriceOfDay,
                  });
                }
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
  }
);

//@route GET cage/addCage
//@desc get all employees
//@access Private
// router.get(
//   "/addCage",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     req.context.models.employee.findAll().then(employees => {
//       const sendData = employees.map(item => {
//         return {
//           FirstName: item.FirstName,
//           LastName: item.LastName,
//           Phone: item.Phone,
//         };
//       });
//       return res.send(sendData);
//     });
//   }
// );

//@route GET cage/allCages
//@desc get cages
//@access Private
router.get(
  "/allCages",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    req.context.models.cage
      .findAll({
        include: [
          {
            model: req.context.models.invoiceCage_cage,
            include: [
              {
                model: req.context.models.invoiceCage,
                include: [
                  {
                    model: req.context.models.employee,
                  },
                ],
              },
            ],
          },
        ],
      })
      .then(projects => {
        const sendData = projects.map(item => {
          let data = item.invoiceCage_cages.reduce((sum, current) => {
            return {
              Amount: sum.Amount + current.Amount,
            };
          });
          return {
            id: item.id,
            NameFirma: item.NameFirma,
            KindOfCage: item.KindOfCage,
            TypeOfCage: item.TypeOfCage,
            PriceOfDay: item.PriceOfDay,
            Amount: data.Amount,
          };
        });
        return res.send(sendData);
      });
  }
);

//@route DELETE cage/allCages/:id
//@desc Return all cages and delete one
//@access Private
router.delete(
  "/allCages/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.cage
      .destroy({ where: { id: req.params.id } })
      .then(cage => {
        console.log(`Клетка удалена? 1 means yes, 0 means no: ${cage}`);
        return req.context.models.cage
          .findAll({
            include: [
              {
                model: req.context.models.invoiceCage_cage,
                include: [
                  {
                    model: req.context.models.invoiceCage,
                  },
                ],
              },
            ],
          })
          .then(projects => {
            const sendData = projects.map(item => {
              let data = item.invoiceCage_cages.reduce((sum, current) => {
                return {
                  Amount: sum.Amount + current.Amount,
                };
              });
              return {
                id: item.id,
                NameFirma: item.NameFirma,
                KindOfCage: item.KindOfCage,
                TypeOfCage: item.TypeOfCage,
                PriceOfDay: item.PriceOfDay,
                Amount: data.Amount,
              };
            });
            return res.send(sendData);
          });
      });
  }
);

//@route UPDATE cage/allCages/:id
//@desc Return all Empoloyees and update one
//@access Private
router.put(
  "/allCages/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = employeeUpdate(req.body);

    // //Check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    req.context.models.cage
      .findOne({
        where: { id: req.params.id },
        include: [
          {
            model: req.context.models.invoiceCage_cage,
          },
        ],
      })
      .then(cage => {
        cage
          .update({
            NameFirma: req.body.NameFirma,
            PriceOfDay: req.body.PriceOfDay,
          })
          .then(() => {
            return req.context.models.cage
              .findAll({
                include: [
                  {
                    model: req.context.models.invoiceCage_cage,
                    include: [
                      {
                        model: req.context.models.invoiceCage,
                      },
                    ],
                  },
                ],
              })
              .then(projects => {
                const sendData = projects.map(item => {
                  let data = item.invoiceCage_cages.reduce((sum, current) => {
                    return {
                      Amount: sum.Amount + current.Amount,
                      UnitPrice: sum.UnitPrice + current.UnitPrice,
                    };
                  });
                  return {
                    id: item.id,
                    NameFirma: item.NameFirma,
                    KindOfCage: item.KindOfCage,
                    TypeOfCage: item.TypeOfCage,
                    PriceOfDay: item.PriceOfDay,
                    Amount: data.Amount,
                    SumUnitPrice: data.UnitPrice,
                  };
                });
                return res.send(sendData);
              });
          });
      });
  }
);

export default router;
