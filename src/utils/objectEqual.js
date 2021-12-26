export function objEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    const isNotKeysEqual = keys1.map(key => keys2.includes(key))
        .some(item => item === false);

    if (isNotKeysEqual) {
        return false;
    }

    const isNotValuesEqual = keys1.map(key => obj1[key] === obj2[key])
        .some(item => item === false);

    if (isNotValuesEqual) {
        return false;
    }

    return true;
}
