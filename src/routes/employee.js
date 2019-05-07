import { Router } from "express";

const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//@route POST employee/register
//@desc Register employee
//@access Public
router.post("/register", (req, res) => {
  req.context.models.employee
    .findOne({ where: { Phone: req.body.Phone } })
    .then(user => {
      if (user) {
        return res.status(400).json("phone already exists");
      } else {
        const employee = new req.context.models.employee({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Phone: req.body.Phone,
          Password: req.body.Password,
          Birthday: req.body.Birthday,
          Adress: req.body.Adress,
          StartDate: req.body.StartDate,
          Position: req.body.Position,
          SalaryChange: req.body.SalaryChange,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(employee.Password, salt, (err, hash) => {
            if (err) throw err;
            employee.Password = hash;
            employee
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

//@route POST employee/login
//@desc login employee/ Returning JWT Token
//@access Public
router.post("/login", (req, res) => {
  const password = req.body.Password;

  //Find user by email
  req.context.models.employee
    .findOne({ where: { Phone: req.body.Phone } })
    .then(user => {
      if (!user) {
        return res.status(400).json("employee not found");
      }

      //Check password
      bcrypt.compare(password, user.Password).then(isMatch => {
        if (isMatch) {
          //User matched
          const payload = {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Phone: user.Phone,
            Birthday: user.Birthday,
            Adress: user.Adress,
            StartDate: user.StartDate,
            Position: user.Position,
            SalaryChange: user.SalaryChange,
          }; // Create JWT payload
          //Sign token
          jwt.sign(
            payload,
            process.env.SecretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json("Password incorrect");
        }
      });
    });
});

//@route GET employee/current
//@desc Return current employee
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Phone: req.user.Phone,
      Birthday: req.user.Birthday,
      Adress: req.user.Adress,
      StartDate: req.user.StartDate,
      Position: req.user.Position,
      SalaryChange: req.user.SalaryChange,
    });
  }
);

export default router;
