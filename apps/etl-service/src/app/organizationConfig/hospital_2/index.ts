import { Patient, Treatment } from '../../types';
import { eIsDeceased } from '../enums';
import { eSex } from '../enums/sex';

interface Hospital2Patient {
  PatientId: string;
  MRN: string;
  PatientDOB: string;
  IsPatientDeceased: string;
  DeathDate: string;
  LastName: string;
  FirstName: string;
  Gender: string;
  Sex: string;
  AddressLine: string;
  AddressCity: string;
  AddressState: string;
  AddressZipCode: string;
}

interface Hospital2Treatment {
  TreatmentId: string;
  PatientId: string;
  ProtocolID: string;
  StartDate: string;
  EndDate: string;
  Status: string;
  DisplayName: string;
  AssociatedDiagnoses: string;
  NumberOfCycles: number;
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
  AddressZipCode,
}: Hospital2Patient): Patient => {
  return {
    id: PatientId,
    mrn: MRN,
    dateOfBirth: new Date(PatientDOB),
    isDeceased: IsPatientDeceased === 'N' ? eIsDeceased.Deceased : eIsDeceased.Active,
    dateOfDeath: new Date(DeathDate),
    lastName: LastName,
    firstName: FirstName,
    gender: Gender,
    sex: Sex === 'Male' ? eSex.Male : eSex.Female,
    address: AddressLine,
    city: AddressCity,
    state: AddressState,
    zipCode: AddressZipCode,
  };
};

const getCycles = (startDate: Date, endDate: Date, numberOfCycles: number): string => {
  const days = Math.ceil(
    (endDate.getTime() - startDate.getTime()) /
    (60 * 60 * 24 * 1000) /
    numberOfCycles);
  return `${days}X${numberOfCycles}`;
};

export const transformTreatment2 = ({
  TreatmentId,
  PatientId,
  ProtocolID,
  StartDate,
  EndDate,
  Status,
  DisplayName,
  AssociatedDiagnoses,
  NumberOfCycles,
}: Hospital2Treatment): Treatment => {
  const endDate = new Date(EndDate);
  const startDate = new Date(StartDate);
  return {
    id: TreatmentId,
    startDate,
    endDate,
    active: Status,
    displayName: DisplayName,
    diagnoses: AssociatedDiagnoses,
    cyclesXDays: getCycles(startDate, endDate, NumberOfCycles),
    patientId: PatientId,
    protocolId: ProtocolID,
  };
};
