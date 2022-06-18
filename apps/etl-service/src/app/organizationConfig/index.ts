import { csvSerializer } from "../serializers/csvSerializer";
import { transformPatient1, transformTreatment1 } from "./hospital_1";
import { transformPatient2, transformTreatment2} from './hospital_2';

export const config = {
  hospital_1: {
    serializer: new csvSerializer(),
    patientTransformer: transformPatient1,
    treatmentTransformer: transformTreatment1,
  },
  hospital_2: {
    serializer: new csvSerializer(),
    patientTransformer: transformPatient2,
    treatmentTransformer: transformTreatment2,
  }
};
