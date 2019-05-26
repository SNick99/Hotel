export const validatorEmployee = values => {
  const errors = {};
  if (
    values.FirstName &&
    (values.FirstName.length < 2 || values.FirstName.length > 30)
  ) {
    errors.FirstName = 'Имя должно иметь от 2 до 30 символов';
  }
  if (
    values.LastName &&
    (values.LastName.length < 2 || values.LastName.length > 30)
  ) {
    errors.LastName = 'Фамилия должна иметь от 2 до 30 символов';
  }

  if (!values.FirstName) {
    errors.FirstName = 'Поле дожно быть заполненно';
  }
  if (!values.LastName) {
    errors.LastName = 'Поле дожно быть заполненно';
  }

  if (!values.Adress) {
    errors.Adress = 'Поле дожно быть заполненно';
  }

  if (!values.Position) {
    errors.Position = 'Поле дожно быть заполненно';
  }

  if (!values.SalaryChange) {
    errors.SalaryChange = 'Поле дожно быть заполненно';
  }

  return errors;
};

export const validatorClient = values => {
  const errors = {};
  if (
    values.FirstName &&
    (values.FirstName.length < 2 || values.FirstName.length > 30)
  ) {
    errors.FirstName = 'Имя должно иметь от 2 до 30 символов';
  }
  if (
    values.LastName &&
    (values.LastName.length < 2 || values.LastName.length > 30)
  ) {
    errors.LastName = 'Фамилия должна иметь от 2 до 30 символов';
  }

  if (!values.FirstName) {
    errors.FirstName = 'Поле дожно быть заполненно';
  }
  if (!values.LastName) {
    errors.LastName = 'Поле дожно быть заполненно';
  }

  return errors;
};

export const validatorCage = values => {
  const errors = {};

  if (!values.PriceOfDay) {
    errors.PriceOfDay = 'Поле дожно быть заполненно';
  }

  return errors;
};

export const validatorProduct = values => {
  const errors = {};

  if (!values.PriceOfUnit) {
    errors.PriceOfUnit = 'Поле дожно быть заполненно';
  }

  return errors;
};

export const validatorSchedule = values => {
  const errors = {};

  if (!values.DateChange) {
    errors.DateChange = 'Поле дожно быть заполненно';
  }

  return errors;
};
