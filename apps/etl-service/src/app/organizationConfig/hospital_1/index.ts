import { Patient, Treatment } from '../../types';
import { eSex } from '../enums/sex';

interface Hospital1Patient {
  PatientID: string;
  MRN: string;
  PatientDOB: string;
  IsDeceased: string;
  DOD_TS: string;
  LastName: string;
  FirstName: string;
  Gender: string;
  Sex: string;
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  LastModifiedDate: string;
}

interface Hospital1Treatment {
  PatientID: string;
  StartDate: Date;
  EndDate: Date;
  Active: string;
  DisplayName: string;
  Diagnoses: string;
  TreatmentLine: string;
  CyclesXDays: string;
  TreatmentID: string;
}

export const transformPatient1 = ({
  PatientID,
  MRN,
  PatientDOB,
  IsDeceased,
  DOD_TS,
  LastName,
  FirstName,
  Gender,
  Sex,
  Address,
  City,
  State,
  ZipCode,
  LastModifiedDate,
}: Hospital1Patient): Patient => {
  return {
    id: PatientID,
    mrn: MRN,
    dateOfBirth: new Date(PatientDOB),
    isDeceased: IsDeceased,
    dateOfDeath: new Date(DOD_TS),
    lastName: LastName,
    firstName: FirstName,
    gender: Gender,
    sex: Sex === 'Male' ? eSex.Male : eSex.Female,
    address: Address,
    city: City,
    state: State,
    zipCode: ZipCode,
    lastModifiedDate: new Date(LastModifiedDate),
  };
};

export const transformTreatment1 = ({
  PatientID,
  StartDate,
  EndDate,
  Active,
  DisplayName,
  Diagnoses,
  TreatmentLine,
  CyclesXDays,
  TreatmentID,
}: Hospital1Treatment): Treatment => {
  return {
    id: TreatmentID,
    startDate: new Date(StartDate),
    endDate: new Date(EndDate),
    active: Active,
    displayName: DisplayName,
    diagnoses: Diagnoses,
    treatmentLine: TreatmentLine,
    cyclesXDays: CyclesXDays,
    patientId: PatientID,
  };
};
