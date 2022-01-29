import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { validator } from "../../utils/validator";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import validatorConfig from "../../config/registerForm";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

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
            <SelectField
                label="Профессия"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
                options={professions}
                defaultOption="Выбор профессии"
            />
            <RadioField
                label="Пол"
                name="sex"
                value={data.sex}
                onChange={handleChange}
                options={[
                    { name: "Мужской", value: "male" },
                    { name: "Женский", value: "female" },
                    { name: "Другое", value: "other" }
                ]}
            />
            <MultiSelectField
                label="Качества"
                options={qualities}
                onChange={handleChange}
                name="qualities"
                defaultValue={data.qualities}
                placeholder="Выберите свои качества"
            />
            <CheckBoxField value={ data.licence } onChange={ handleChange } name="licence" error={ errors.licence }>
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={isValid}
                className="btn btn-primary mx-auto w-100"
            >
                Зарегистрироваться
            </button>
        </form>
    );
};

export default RegisterForm;
