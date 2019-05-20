import Validator from "validator";
import isEmpty from "./is-empty";

const employeeUpdate = data => {
  const errors = {};

  data.FirstName = !isEmpty(data.FirstName) ? data.FirstName : "";
  data.LastName = !isEmpty(data.LastName) ? data.LastName : "";
  data.Birthday = !isEmpty(data.Birthday) ? data.Birthday : "";
  data.Adress = !isEmpty(data.Adress) ? data.Adress : "";
  data.Position = !isEmpty(data.Position) ? data.Position : "";
  data.SalaryChange = !isEmpty(data.SalaryChange) ? data.SalaryChange : "";

  if (!Validator.isLength(data.FirstName, { min: 2, max: 30 })) {
    errors.FirstName = "Имя должно иметь от 2 до 30 символов";
  }

  if (!Validator.isLength(data.LastName, { min: 2, max: 30 })) {
    errors.LastName = "Фамилия должна иметь от 2 до 30 символов";
  }

  if (Validator.isEmpty(data.Birthday)) {
    errors.Birthday = "Поле дожно быть заполненно";
  }

  if (Validator.isEmpty(data.Adress)) {
    errors.Adress = "Поле дожно быть заполненно";
  }

  if (Validator.isEmpty(data.Position)) {
    errors.Position = "Поле дожно быть заполненно";
  }

  if (Validator.isEmpty(data.SalaryChange)) {
    errors.SalaryChange = "Поле дожно быть заполненно";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default employeeUpdate;
