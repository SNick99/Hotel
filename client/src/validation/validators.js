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
  if (values.Phone && isNaN(Number(values.Phone))) {
    errors.Phone = 'Некорректный номер телефона';
  }
  if (values.Phone && (values.Phone.length < 10 || values.Phone.length > 20)) {
    errors.Phone = 'Номер телефона должен иметь от 10 до 20 символов';
  }
  if (
    values.Password &&
    (values.Password.length < 6 || values.Password.length > 20)
  ) {
    errors.Password = 'Пароль должен иметь от 6 до 20 символов';
  }
  if (
    values.Password2 &&
    (values.Password2.length < 6 || values.Password2.length > 20)
  ) {
    errors.Password2 = 'Пароль должен иметь от 6 до 20 символов';
  }
  if (
    values.Password &&
    values.Password2 &&
    values.Password !== values.Password2
  ) {
    errors.Password2 = 'Пароли должны совпадать';
  }
  if (!values.FirstName) {
    errors.FirstName = 'Поле дожно быть заполненно';
  }
  if (!values.LastName) {
    errors.LastName = 'Поле дожно быть заполненно';
  }
  if (!values.Phone) {
    errors.Phone = 'Поле дожно быть заполненно';
  }
  if (!values.Password) {
    errors.Password = 'Поле дожно быть заполненно';
  }
  if (!values.Password2) {
    errors.Password2 = 'Поле дожно быть заполненно';
  }
  if (!values.Birthday) {
    errors.Birthday = 'Поле дожно быть заполненно';
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
  if (values.Phone && isNaN(Number(values.Phone))) {
    errors.Phone = 'Некорректный номер телефона';
  }
  if (values.Phone && (values.Phone.length < 10 || values.Phone.length > 20)) {
    errors.Phone = 'Номер телефона должен иметь от 10 до 20 символов';
  }
  if (
    values.NamePet &&
    (values.NamePet.length < 2 || values.NamePet.length > 30)
  ) {
    errors.NamePet = 'Имя должно иметь от 2 до 30 символов';
  }
  if (!values.FirstName) {
    errors.FirstName = 'Поле дожно быть заполненно';
  }
  if (!values.LastName) {
    errors.LastName = 'Поле дожно быть заполненно';
  }
  if (!values.Phone) {
    errors.Phone = 'Поле дожно быть заполненно';
  }
  if (!values.Birthday) {
    errors.Birthday = 'Поле дожно быть заполненно';
  }
  if (!values.NamePet) {
    errors.NamePet = 'Поле дожно быть заполненно';
  }
  if (!values.KindOfPet) {
    errors.KindOfPet = 'Поле дожно быть заполненно';
  }
  if (!values.PassportCode) {
    errors.PassportCode = 'Поле дожно быть заполненно';
  }
  return errors;
};

export const validatorCage = values => {
  const errors = {};

  if (!values.KindOfCage) {
    errors.KindOfCage = 'Поле дожно быть заполненно';
  }
  if (!values.NameFirma) {
    errors.NameFirma = 'Поле дожно быть заполненно';
  }
  if (!values.PriceOfDay) {
    errors.PriceOfDay = 'Поле дожно быть заполненно';
  }
  if (!values.TypeOfCage) {
    errors.TypeOfCage = 'Поле дожно быть заполненно';
  }
  if (!values.Amount) {
    errors.Amount = 'Поле дожно быть заполненно';
  }
  if (!values.UnitPrice) {
    errors.UnitPrice = 'Поле дожно быть заполненно';
  }
  return errors;
};

export const validatorProduct = values => {
  const errors = {};

  if (!values.NameOfProduct) {
    errors.NameOfProduct = 'Поле дожно быть заполненно';
  }
  if (!values.NameFirma) {
    errors.NameFirma = 'Поле дожно быть заполненно';
  }
  if (!values.PriceOfUnit) {
    errors.PriceOfUnit = 'Поле дожно быть заполненно';
  }
  if (!values.UnitPrice) {
    errors.UnitPrice = 'Поле дожно быть заполненно';
  }
  if (!values.Amount) {
    errors.Amount = 'Поле дожно быть заполненно';
  }
  return errors;
};

export const validatorOrder = values => {
  const errors = {};

  if (!values.EndDate) {
    errors.EndDate = 'Поле дожно быть заполненно';
  }
  if (!values.Client) {
    errors.Client = 'Поле дожно быть заполненно';
  }
  if (!values.Pet) {
    errors.Pet = 'Поле дожно быть заполненно';
  }
  if (!values.Employee) {
    errors.Employee = 'Поле дожно быть заполненно';
  }
  if (!values.Product) {
    errors.Product = 'Поле дожно быть заполненно';
  }
  if (!values.Cage) {
    errors.Cage = 'Поле дожно быть заполненно';
  }

  return errors;
};

export const validatorSchedule = values => {
  const errors = {};

  if (!values.WorkDate) {
    errors.WorkDate = 'Поле дожно быть заполненно';
  }
  if (!values.Employee) {
    errors.Employee = 'Поле дожно быть заполненно';
  }

  return errors;
};
