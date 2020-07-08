export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface PatientFull {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male= 'male',
  Female = 'female',
  Other = 'other'
}

export type Patient = Omit<PatientFull, 'ssn'>;

export type NewPatient = Omit<PatientFull, 'id'>;