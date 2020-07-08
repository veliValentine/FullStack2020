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
  gender: string;
  occupation: string;
}

export type Patient = Omit<PatientFull, 'ssn'>;

export type NewPatient = Omit<PatientFull, 'id'>;