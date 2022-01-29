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
    },
    profession: {
        isRequired: {
            message: "Необходимо выбрать профессию."
        }
    }
};

export default validatorConfig;
