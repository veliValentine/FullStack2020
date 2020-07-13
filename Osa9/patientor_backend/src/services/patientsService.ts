import patientsData from '../../data/patients';
import { Patient, NewPatient, PatientFull } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const newPatient = (obj: NewPatient): Patient => {
  const { ssn, ...data } = obj;

  const id = uuid();

  const newPatient = {
    ...data,
    id,
  };
  patientsData.push({ ssn, ...newPatient });
  return newPatient;
};

const getPatient = (id: string): PatientFull => {
  const patient = patientsData.find(p => p.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

export default {
  getPatients,
  newPatient,
  getPatient,
};