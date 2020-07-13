/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender } from './types';

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

const isGendre = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGendre(gender)) {
    throw new Error(`Incorrect ot missing gender: ${gender}`);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, 'name'),
    ssn: parseString(object.ssn, 'ssn'),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries
  };
};

export default toNewPatient;