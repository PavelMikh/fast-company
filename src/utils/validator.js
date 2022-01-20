export function validator(data, config) {
    function validate(validateMethod, data, config) {
        let status;
        switch (validateMethod) {
        case "isRequired":
            status = data.trim() === "";
            break;

        case "isEmail": {
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            status = !emailRegExp.test(data);
            break;
        }

        case "isCapitalSymbol": {
            const capitalRegExp = /[A-Z]/g;
            status = !capitalRegExp.test(data);
            break;
        }

        case "isDigit": {
            const digitRegExp = /\d/g;
            status = !digitRegExp.test(data);
            break;
        }

        case "min":
            status = data.length < config.value;
            break;

        default:
            break;
        }

        if (status) return config.message;
    };

    const errors = {};
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        };
    };

    return errors;
};
