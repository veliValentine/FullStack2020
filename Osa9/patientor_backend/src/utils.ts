/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender, NewEntry, Diagnose, HealthCheckRating } from './types';

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

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return [0, 1, 2, 3].includes(param);
};

const parseHealthCheckRating = (obj: any): HealthCheckRating => {
  if (isNaN(obj)) {
    throw new Error(`missing HealthCheckRating: ${obj}`);
  }
  if (!isHealthCheckRating(Number(obj))) {
    throw new Error(`Incorret HealthCheckRating: ${obj}`);
  }
  return Number(obj);
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnose['code']> => {
  if (!diagnosisCodes) {
    throw new Error(`Missing diagnosisCodes: ${diagnosisCodes}`);
  }
  if (isString(diagnosisCodes)) {
    diagnosisCodes = diagnosisCodes.split(',');
  }

  if (!(diagnosisCodes instanceof Array)) {
    throw new Error(`DiagnosisCodes is not an array: ${diagnosisCodes}`);
  }
  if (diagnosisCodes.some(d => !isString(d))) {
    throw new Error(`Array contains something else than diagnoses: ${diagnosisCodes}`);
  }
  const diagnosisArray = diagnosisCodes.map(d => parseString(d, 'parseDiagnosisCode'));
  return diagnosisArray;
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge || !discharge.date || !discharge.criteria) {
    throw new Error(`Missing arguments, discharge: ${discharge}`);
  }
  const date = discharge.date;
  const criteria = discharge.criteria;
  if (!isDate(date) || !isString(criteria)) {
    throw new Error(`Invalid discharge: ${discharge}`);
  }

  return { date, criteria };
};

const parseSickLeave = (leave: any): { startDate: string, endDate: string } => {
  if (!leave || !leave.startDate || !leave.endDate) {
    throw new Error(`Missing arguments: ${leave}`);
  }
  const startDate = leave.startDate;
  const endDate = leave.endDate;

  if (!isDate(startDate) || !isDate(endDate)) {
    throw new Error(`Invalid arguments: ${leave}`);
  }
  return {
    startDate, endDate
  };
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

export const toNewEntry = (object: any): NewEntry => {
  const baseInfo = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : undefined
  };
  if (object.healthCheckRating === 0 || object.healthCheckRating) {
    return {
      ...baseInfo,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
  }
  if (object.discharge) {
    return {
      ...baseInfo,
      type: 'Hospital',
      discharge: parseDischarge(object.discharge)
    };
  }
  return {
    ...baseInfo,
    type: 'OccupationalHealthcare',
    employerName: parseString(object.employerName, 'employerName'),
    sickLeave: object.sickLeave ? parseSickLeave(object.sickLeave) : undefined
  };
};

export default toNewPatient;