import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import validatorConfig from "../../../config/editForm";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditPage = ({ history, urlParam, id }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

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
        const currentPath = history.location.pathname;
        history.replace(`${currentPath}`.replace(`/${urlParam}`, ""));
        console.log("data", data);
    };

    const handleChange = (target) => {
        if (target) {
            setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        }
    };

    return (
        user
            ? (<form onSubmit={handleSubmit}>
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
            ) : (
                <p>Загрузка данных...</p>
            )
    );
};

UserEditPage.propTypes = {
    history: PropTypes.object.isRequired,
    urlParam: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default UserEditPage;
