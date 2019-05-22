import Validator from 'validator';
import isEmpty from './is-empty';

const validateRegisterInput = data => {
    console.log(data);
    const errors = {};

    data.FirstName = !isEmpty(data.FirstName) ? data.FirstName : '';
    data.LastName = !isEmpty(data.LastName) ? data.LastName : '';
    data.Phone = !isEmpty(data.Phone) ? data.Phone : '';
    data.Password = !isEmpty(data.Password) ? data.Password : '';
    data.Password2 = !isEmpty(data.Password2) ? data.Password2 : '';
    data.Birthday = !isEmpty(data.Birthday) ? data.Birthday : '';
    data.Adress = !isEmpty(data.Adress) ? data.Adress : '';
    //data.StartDate = !isEmpty(data.StartDate) ? data.StartDate : '';
    data.Position = !isEmpty(data.Position) ? data.Position : '';
    data.SalaryChange = !isEmpty(data.SalaryChange) ? data.SalaryChange : '';

    if (!Validator.isLength(data.FirstName, { min: 2, max: 30 })) {
        errors.FirstName = 'Имя должно иметь от 2 до 30 символов';
    }

    if (!Validator.isLength(data.LastName, { min: 2, max: 30 })) {
        errors.LastName = 'Фамилия должна иметь от 2 до 30 символов';
    }

    if (!Validator.isMobilePhone(data.Phone)) {
        errors.Phone = 'Некорректный номер телефона';
    }
    if (!Validator.isLength(data.Phone, { min: 10, max: 20 })) {
        errors.Phone = 'Номер телефона должен иметь от 10 до 20 символов';
    }

    if (!Validator.isLength(data.Password, { min: 6, max: 20 })) {
        errors.Password = 'Пароль должен иметь от 6 до 20 символов';
    }
    if (!Validator.equals(data.Password, data.Password2)) {
        errors.Password2 = 'Пароли должны совпадать';
    }

    if (Validator.isEmpty(data.Birthday)) {
        errors.Birthday = 'Поле дожно быть заполненно';
    }

    if (Validator.isEmpty(data.Adress)) {
        errors.Adress = 'Поле дожно быть заполненно';
    }

    if (Validator.isEmpty(data.Position)) {
        errors.Position = 'Поле дожно быть заполненно';
    }

    if (Validator.isEmpty(data.SalaryChange)) {
        errors.SalaryChange = 'Поле дожно быть заполненно';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateRegisterInput;
