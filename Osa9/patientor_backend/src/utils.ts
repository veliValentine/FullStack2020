/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (obj: any, type: string): string => {
  if (!obj || !isString(obj)) {
    throw new Error(`Incorrect or missing ${type}: ${obj}`);
  }
  return obj;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(object.name, 'name'),
    ssn: parseString(object.ssn, 'snn'),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseString(object.gender, 'genre'),
    occupation: parseString(object.occupation, 'occupation'),
  };
  return newPatient;
};

export default toNewPatient;