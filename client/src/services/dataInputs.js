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
    },
    {
      type: 'number',
      name: 'Amount',
      label: 'Количество'
    },
    {
      type: 'number',
      name: 'UnitPrice',
      label: 'Цена/клетку'
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

      name: 'NamePet'
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
      type: 'select',
      label: 'Клиент',
      name: 'Client'
    },
    {
      type: 'select',
      label: 'Питомец',
      name: 'Pet'
    },
    {
      type: 'select',
      label: 'Cотрудник',
      name: 'Employee'
    },
    {
      type: 'select',
      label: 'Товар',
      name: 'Product'
    },
    {
      type: 'select',
      label: 'Клетка',
      name: 'Cage'
    },
    {
      type: 'text',
      label: 'Доп. услуга',

      name: 'Extra',
      req: false // add this parametr if field is not required
    },
    {
      type: 'text',

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
      type: 'number',
      label: 'Количество',
      name: 'Amount'
    }
  ],
  scheduleInputs: [
    {
      type: 'date',
      label: 'Дата смены',

      name: 'WorkDate'
    },
    {
      type: 'select',
      label: 'Сотрудник',
      name: 'Employee',

      helperText: ''
    }
  ]
};
