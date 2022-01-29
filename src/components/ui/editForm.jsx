import React, { useState, useEffect } from "react";
import api from "../../api";
import PropTypes from "prop-types";
import { validator } from "../../utils/validator";
import validatorConfig from "../../config/editForm";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditForm = ({ user, onSubmit }) => {
    const [data, setData] = useState({
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit();
    };

    const handleChange = (target) => {
        if (target) {
            setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        }
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
            <SelectField
                label="Профессия"
                name="profession"
                value={data.profession}
                onChange={handleChange}
                options={professions}
                defaultOption="Выбор профессии"
                error={errors.profession}
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
            <button
                className="btn btn-primary"
                type="submit"
            >
                        Применить изменения
            </button>
        </form>
    );
};

EditForm.propTypes = {
    user: PropTypes.object,
    onSubmit: PropTypes.func
};

export default EditForm;
