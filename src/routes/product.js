import { Router } from "express";
import moment from "moment";
const router = Router();
const passport = require("passport");

const Today = moment().format("YYYY-MM-DD");

console.log(Today);
//@route POST product/addProduct
//@desc add product
//@access Private
router.post(
  "/addProduct",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.product
      .findOne({
        where: {
          NameFirma: req.body.NameFirma,
          NameOfProduct: req.body.NameOfProduct,
        },
        include: [
          {
            model: req.context.models.invoiceProduct_product,
            include: [
              {
                model: req.context.models.invoiceProduct,
                where: {
                  Date: Today,
                },
              },
            ],
          },
        ],
      })
      .then(product => {
        //if product is true and date is today###############
        if (product) {
          //add to db table invoiceproduct_products
          req.context.models.invoiceProduct_product.create({
            Amount: req.body.Amount,
            UnitPrice: req.body.UnitPrice,
            productId: product.id,
            invoiceProductId:
              product.invoiceProduct_products[0].invoiceProduct.id,
          });
          res.send("Добавили в накладную");
          //if product is false and date is today##################
        } else {
          //add to db table product
          return Promise.all([
            req.context.models.product
              .findOne({
                where: {
                  NameFirma: req.body.NameFirma,
                  NameOfProduct: req.body.NameOfProduct,
                },
              })
              .then(product => {
                if (product) {
                  return product;
                } else {
                  //add to db table product
                  return req.context.models.product.create({
                    NameFirma: req.body.NameFirma,
                    NameOfProduct: req.body.NameOfProduct,
                    PriceOfUnit: req.body.PriceOfUnit,
                  });
                }
              }),
            req.context.models.invoiceProduct
              .findOne({
                where: { Date: Today },
              })
              .then(day => {
                if (day) {
                  return day;
                } else {
                  //add to db table invoiceproduct
                  return req.context.models.invoiceProduct.create({
                    Date: Today,
                    employeeId: req.body.employeeId,
                  });
                }
              }),
          ]).then(result => {
            //add to db table invoiceproduct_products
            req.context.models.invoiceProduct_product.create({
              Amount: req.body.Amount,
              UnitPrice: req.body.UnitPrice,
              productId: result[0].id,
              invoiceProductId: result[1].id,
            });
          });
        }
      });
  }
);

//@route GET cage/allCages
//@desc get cages
//@access Private
router.get(
  "/allProducts",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    req.context.models.product
      .findAll({
        include: [
          {
            model: req.context.models.invoiceProduct_product,
            include: [
              {
                model: req.context.models.invoiceProduct,
              },
            ],
          },
        ],
      })
      .then(projects => {
        const sendData = projects.map(item => {
          let data = item.invoiceProduct_products.reduce((sum, current) => {
            return {
              Amount: sum.Amount + current.Amount,
            };
          });
          return {
            id: item.id,
            NameFirma: item.NameFirma,
            NameOfProduct: item.NameOfProduct,
            PriceOfUnit: item.PriceOfUnit,
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
  "/allProducts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.product
      .destroy({ where: { id: req.params.id } })
      .then(cage => {
        console.log(`Product удален? 1 means yes, 0 means no: ${cage}`);
        return req.context.models.product
          .findAll({
            include: [
              {
                model: req.context.models.invoiceProduct_product,
                include: [
                  {
                    model: req.context.models.invoiceProduct,
                  },
                ],
              },
            ],
          })
          .then(projects => {
            const sendData = projects.map(item => {
              let data = item.invoiceProduct_products.reduce((sum, current) => {
                return {
                  Amount: sum.Amount + current.Amount,
                  UnitPrice: sum.UnitPrice + current.UnitPrice,
                };
              });
              return {
                id: item.id,
                NameFirma: item.NameFirma,
                NameOfProduct: item.NameOfProduct,
                PriceOfUnit: item.PriceOfUnit,
                Amount: data.Amount,
                SumUnitPrice: data.UnitPrice,
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
  "/allProducts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.product
      .findOne({
        where: { id: req.params.id },
        include: [
          {
            model: req.context.models.invoiceProduct_product,
          },
        ],
      })
      .then(product => {
        product
          .update({
            NameFirma: req.body.NameFirma,
            NameOfProduct: req.body.NameOfProduct,
            PriceOfUnit: req.body.PriceOfUnit,
          })
          .then(() => {
            return req.context.models.product
              .findAll({
                include: [
                  {
                    model: req.context.models.invoiceProduct_product,
                    include: [
                      {
                        model: req.context.models.invoiceProduct,
                      },
                    ],
                  },
                ],
              })
              .then(projects => {
                const sendData = projects.map(item => {
                  let data = item.invoiceProduct_products.reduce(
                    (sum, current) => {
                      return {
                        Amount: sum.Amount + current.Amount,
                        UnitPrice: sum.UnitPrice + current.UnitPrice,
                      };
                    }
                  );
                  return {
                    id: item.id,
                    NameFirma: item.NameFirma,
                    NameOfProduct: item.NameOfProduct,
                    PriceOfUnit: item.PriceOfUnit,
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
