import Validator from 'validator';
import isEmpty from './is-empty';

const validateLoginInput = data => {
    console.log(data);
    const errors = {};

    data.Phone = !isEmpty(data.Phone) ? data.Phone : '';
    data.Password = !isEmpty(data.Password) ? data.Password : '';

    if (!Validator.isMobilePhone(data.Phone)) {
        errors.Phone = 'Некорректный номер телефона';
    }
    if (!Validator.isLength(data.Phone, { min: 10, max: 20 })) {
        errors.Phone = 'Номер телефона должен иметь от 10 до 20 символов';
    }

    if (!Validator.isLength(data.Password, { min: 6, max: 20 })) {
        errors.Password = 'Пароль должен иметь от 6 до 20 символов';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

export default validateLoginInput;
