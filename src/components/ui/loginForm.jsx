import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import { validator } from "../../utils/validator";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения."
            },
            isEmail: {
                message: "Электронная почта введена некорректно."
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения."
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать минимум одну заглавную букву."
            },
            isDigit: {
                message: "Пароль должен содержать минимум одну цифру."
            },
            min: {
                message: "Минимальная длина пароля 8 символов.",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        if (target) {
            setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                value={data.email}
                onChange={handleChange}
                name="email"
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                value={data.password}
                onChange={handleChange}
                name="password"
                error={errors.password}
            />
            <CheckBoxField value={ data.stayOn } onChange={ handleChange } name="stayOn">
                Оставаться в системе
            </CheckBoxField>
            <button type="submit" disabled={isValid} className="btn btn-primary mx-auto w-100">Войти</button>
        </form>
    );
};

export default LoginForm;
