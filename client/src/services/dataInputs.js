export const inputs = {
  employeeInputs: [
    {
      type: 'text',
      label: 'Имя',
      name: 'FirstName',
      helperText: ''
    },
    {
      type: 'text',
      label: 'Фамилия',
      name: 'LastName',
      helperText: ''
    },
    {
      type: 'number',
      label: 'Телефон',
      name: 'Phone',
      helperText: ''
    },

    {
      type: 'password',
      label: 'Пароль',
      name: 'Password',
      helperText: ''
    },
    {
      type: 'password',
      label: 'Повторить пароль',
      name: 'Password2'
    },
    {
      type: 'date',
      label: 'День рождения',
      name: 'Birthday'
    },
    {
      type: 'text',
      label: 'Домашний адрес (Город, улица, дом, квартира)',
      name: 'Adress'
    },
    {
      type: 'text',
      label: 'Должность сотрудника',
      name: 'Position'
    },
    {
      type: 'number',
      label: 'Оклад сотрудника за одну смену',
      name: 'SalaryChange'
    }
  ],
  cageInputs: [
    {
      type: 'text',
      name: 'KindOfCage',
      label: 'Название'
    },
    {
      type: 'text',
      name: 'NameFirma',
      label: 'Фирма'
    },
    {
      type: 'number',
      name: 'PriceOfDay',
      label: 'Стоимость/сутки'
    },

    {
      type: 'text',
      name: 'TypeOfCage',
      label: 'Тип'
    }
  ],
  clientInputs: [
    {
      type: 'text',
      label: 'Имя',
      name: 'FirstName'
    },
    {
      type: 'text',
      label: 'Фамилия',
      name: 'LastName'
    },
    {
      type: 'number',
      label: 'Телефон',
      name: 'Phone'
    },
    {
      type: 'date',
      label: 'День рождения',
      name: 'Birthday'
    },
    {
      type: 'text',
      label: 'Имя питомца',
      name: 'PetName'
    },
    {
      type: 'text',
      label: 'Вид',
      name: 'KindOfPet'
    },
    {
      type: 'number',
      label: 'Код',
      name: 'PassportCode'
    }
  ],
  orderInputs: [
    {
      type: 'date',
      label: 'Дата завершения заказа',
      name: 'EndDate'
    },
    {
      type: 'text',
      label: 'Имя клиента',
      name: 'FirstName'
    },
    {
      type: 'number',
      label: 'Телефон',
      name: 'Phone'
    },
    {
      type: 'text',
      label: 'Имя питомца',
      name: 'PetName'
    },
    {
      type: 'text',
      label: 'Вид',
      name: 'KindOfPet'
    },
    {
      type: 'number',
      label: 'Код',
      name: 'PassportCode'
    },
    {
      type: 'text',
      label: 'Имя товара',
      name: 'KindOfCage'
    },
    {
      type: 'text',
      label: 'Фирма клетки',
      name: 'NameFirma'
    },
    {
      type: 'text',
      label: 'Тип клетки',
      name: 'TypeOfCage'
    },
    {
      type: 'text',
      label: 'Доп. услуга',
      name: 'ExtraService',
      req: false
    },
    {
      type: 'number',
      label: 'Цена доп. услуги',
      name: 'ExtraPrice',
      req: false
    }
  ],
  productInputs: [
    {
      type: 'text',
      label: 'Название',
      name: 'NameOfProduct'
    },
    {
      type: 'text',
      label: 'Фирма',
      name: 'NameFirma'
    },
    {
      type: 'number',
      label: 'Стоимость (продажа)',
      name: 'PriceOfUnit'
    },
    {
      type: 'number',
      label: 'Стоимость (покупка)',
      name: 'UnitPrice'
    },
    {
      type: 'text',
      label: 'Сотрудник',
      name: 'Employee'
    },
    {
      type: 'text',
      label: 'Имя',
      name: 'FirstName',
      helperText: ''
    },
    {
      type: 'text',
      label: 'Фамилия',
      name: 'LastName',
      helperText: ''
    },
    {
      type: 'number',
      label: 'Телефон',
      name: 'Phone',
      helperText: ''
    }
  ],
  scheduleInputs : [
    {
      type: 'date',
      label: 'Дата смены',
      name: 'FirstName'
    },
    {
      type: 'text',
      label: 'Имя',
      name: 'FirstName',
      helperText: ''
    },
    {
      type: 'text',
      label: 'Фамилия',
      name: 'LastName',
      helperText: ''
    },
    {
      type: 'select',
      label: 'Телефон',
      name: 'Phone',
      helperText: ''
    }
  ]
};
