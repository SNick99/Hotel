import { Router } from "express";

const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Load Input validation
import validateRegisterInput from "../validation/register";
import validateLoginInput from "../validation/login";

//@route POST employee/register
//@desc Register employee
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  req.context.models.employee
    .findOne({ where: { Phone: req.body.Phone } })
    .then(user => {
      if (user) {
        errors.Phone = "Работник под таким номером уже существует";
        return res.status(400).json(errors);
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
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.Password;

  //Find user by email
  req.context.models.employee
    .findOne({ where: { Phone: req.body.Phone } })
    .then(user => {
      if (!user) {
        errors.Phone = "Работник не найден";
        return res.status(400).json(errors);
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
          errors.Password = "Неверный пароль";
          return res.status(400).json(errors);
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

//@route GET employee/allEmpoloyees
//@desc Return all Empoloyees
//@access Private
router.get(
  "/allEmployees",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.employee.findAll().then(projects => {
      res.send(projects);
    });
  }
);

//@route DELETE employee/allEmployees/:id
//@desc Return all Empoloyees and delete one
//@access Private
router.delete(
  "/allEmployees/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.employee
      .destroy({ where: { id: req.params.id } })
      .then(employee => {
        res.send("Сотрудник удален");
        console.log(`Сотрудник удален? 1 means yes, 0 means no: ${employee}`);
      });
  }
);

export default router;
