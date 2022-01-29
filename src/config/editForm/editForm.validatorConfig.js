const validatorConfig = {
    email: {
        isRequired: {
            message: "Электронная почта обязательна для заполнения."
        },
        isEmail: {
            message: "Электронная почта введена некорректно."
        }
    },
    profession: {
        isRequired: {
            message: "Необходимо выбрать профессию."
        }
    }
};

export default validatorConfig;
