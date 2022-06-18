import { eSex } from "../organizationConfig/enums/sex";

export interface Patient {
  id: string,
  mrn: string,
  dateOfBirth: Date,
  isDeceased: string,
  dateOfDeath: Date,
  lastName: string,
  firstName: string,
  gender: string,
  sex: eSex,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  lastModifiedDate?: Date
}
