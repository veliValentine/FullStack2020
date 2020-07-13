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
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
  Male= 'male',
  Female = 'female',
  Other = 'other'
}

export type Patient = Omit<PatientFull, 'ssn' | 'entries'>;

export type NewPatient = Omit<PatientFull, 'id'>;