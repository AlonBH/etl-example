export interface Treatment {
  id: string,
  patientId: string,
  startDate: Date,
  endDate: Date,
  active: string,
  displayName: string,
  diagnoses: string,
  treatmentLine?: string,
  cyclesXDays: string
}
