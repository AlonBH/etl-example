import { Patient, Treatment } from '../../types';
import { eSex } from '../enums/sex';

interface Hospital2Patient {
  PatientId: string,
  MRN: string,
  PatientDOB: string,
  IsPatientDeceased: string,
  DeathDate: string,
  LastName: string,
  FirstName: string,
  Gender: string,
  Sex: string,
  AddressLine: string,
  AddressCity: string,
  AddressState: string,
  AddressZipCode: string
}

interface Hospital2Treatment {
  PatientID: string,
  StartDate: string,
  EndDate: string,
  Active: string,
  DisplayName: string,
  Diagnoses: string,
  CyclesXDays: string,
  TreatmentID: string
}

export const transformPatient2 = ({
  PatientId,
  MRN,
  PatientDOB,
  IsPatientDeceased,
  DeathDate,
  LastName,
  FirstName,
  Gender,
  Sex,
  AddressLine,
  AddressCity,
  AddressState,
  AddressZipCode
}: Hospital2Patient): Patient => {
  return {
    id: PatientId,
    mrn: MRN,
    dateOfBirth: new Date(PatientDOB),
    isDeceased: IsPatientDeceased,
    dateOfDeath: new Date(DeathDate),
    lastName: LastName,
    firstName: FirstName,
    gender: Gender,
    sex: Sex === 'Male' ? eSex.Male : eSex.Female,
    address: AddressLine,
    city: AddressCity,
    state: AddressState,
    zipCode: AddressZipCode
  };
};

export const transformTreatment2 = ({
  PatientID,
  StartDate,
  EndDate,
  Active,
  DisplayName,
  Diagnoses,
  CyclesXDays,
  TreatmentID
}: Hospital2Treatment): Treatment => {
  return {
    id: TreatmentID,
    startDate: new Date(StartDate),
    endDate: new Date(EndDate),
    active: Active,
    displayName: DisplayName,
    diagnoses: Diagnoses,
    cyclesXDays: CyclesXDays,
    patientId: PatientID,
  }
}
