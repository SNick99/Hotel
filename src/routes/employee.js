import { Router } from "express";
import moment from "moment";

const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Load Input validation
import validateRegisterInput from "../validation/register";
import validateLoginInput from "../validation/login";
import employeeUpdate from "../validation/employeeUpdate";

//@route POST employee/register
//@desc Register employee
//@access Public
router.post("/addEmployee", (req, res) => {
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
        console.log("#####", req.body);
        const employee = new req.context.models.employee({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Phone: req.body.Phone,
          Password: req.body.Password,
          Birthday: req.body.Birthday,
          Adress: req.body.Adress,
          StartDate: moment().format("YYYY-MM-DD"),
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
            id: user.id,
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

//@route GET employee/allEmpoloyees
//@desc Return all Empoloyees
//@access Private
router.get(
  "/allEmployees",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    req.context.models.employee.findAll().then(projects => {
      return res.send(projects);
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
        console.log(`Сотрудник удален? 1 means yes, 0 means no: ${employee}`);
        return req.context.models.employee.findAll().then(projects => {
          return res.send(projects);
        });
      });
  }
);

//@route UPDATE employee/allEmployees/:id
//@desc Return all Empoloyees and update one
//@access Private
router.put(
  "/allEmployees/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = employeeUpdate(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    req.context.models.employee
      .findOne({ where: { id: req.params.id } })
      .then(employee => {
        employee
          .update({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Birthday: req.body.Birthday,
            Adress: req.body.Adress,
            Position: req.body.Position,
            SalaryChange: req.body.SalaryChange,
          })
          .then(() => {
            return req.context.models.employee.findAll().then(projects => {
              return res.send(projects);
            });
          });
      });
  }
);

export default router;
