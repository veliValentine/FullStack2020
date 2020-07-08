import patientsData from '../../data/patients';
import { Patient, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const newPatient = (obj: NewPatient):Patient => {
  const {ssn, ...data} = obj;
  const id = uuid() as string;
  
  const newPatient = {
    ...data,
    id,
  };
  patientsData.push({ssn, ...newPatient});
  return newPatient;
};

export default {
  getPatients,
  newPatient,
};