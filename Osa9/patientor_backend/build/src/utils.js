"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (obj) => {
    if (!obj || !isString(obj)) {
        throw new Error(`Incorrect or missing comment: ${obj}`);
    }
    return obj;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};
const toNewPatient = (object) => {
    const newPatient = {
        name: parseString(object.name),
        ssn: parseString(object.ssn),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseString(object.gender),
        occupation: parseString(object.occupation),
    };
    return newPatient;
};
exports.default = toNewPatient;
