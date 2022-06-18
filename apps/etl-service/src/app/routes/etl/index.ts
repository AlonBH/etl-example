import { Router, Request, Response } from 'express';
import * as fs from 'fs';
import { Transform, pipeline } from 'stream';

import { config } from '../../organizationConfig';
import { Patient, Treatment } from '../../types';

const etlRouter = Router();

const getOrganizationConfig = (fileName: string) => {
  return config[getOrganizationName(fileName)];
};

const getOrganizationName = (fileName: string) =>
  fileName.slice(0, fileName.indexOf('_', fileName.indexOf('_') + 1));

const transformStream = (transformer: (x) => Patient | Treatment): Transform =>
  new Transform({
    transform: function (data, encoding, cb) {
      try {
        const currentObject = JSON.parse(data);
        const transformedPatient = transformer(currentObject);
        const patientString = JSON.stringify(transformedPatient) + '\n';
        cb(null, patientString);
      } catch (err) {
        cb(err);
      }
    },
  });

const handleFinishPipeline = (
  err: NodeJS.ErrnoException,
  fileName: string,
  successMessage: string
) => {
  if (err) {
    console.log(`Error in ${fileName}`);
  } else {
    console.log(successMessage);
  }
};

etlRouter.get('', (req: Request, res: Response) => {
  // This would come from the current batch
  const patientFileName = 'hospital_1_Patient.csv';
  const patientFileStream = fs.createReadStream(
    `${__dirname}/data/${patientFileName}`
  );
  const patientOutputStream = fs.createWriteStream(
    `${__dirname}/data/patient.ndjson`
  );

  const treatmentFileName = 'hospital_2_Treatment.csv';
  const treatmentFileStream = fs.createReadStream(
    `${__dirname}/data/${treatmentFileName}`
  );
  const treatmentOutputStream = fs.createWriteStream(
    `${__dirname}/data/treatment.ndjson`
  );

  try {
    pipeline(
      patientFileStream,
      getOrganizationConfig(patientFileName).serializer.serialize(),
      transformStream(
        getOrganizationConfig(patientFileName).patientTransformer
      ),
      patientOutputStream,
      (err: NodeJS.ErrnoException) =>
        handleFinishPipeline(err, patientFileName, 'Patient pipeline completed successfully')
    );

    pipeline(
      treatmentFileStream,
      getOrganizationConfig(treatmentFileName).serializer.serialize(),
      transformStream(
        getOrganizationConfig(treatmentFileName).treatmentTransformer
      ),
      treatmentOutputStream,
      (err: NodeJS.ErrnoException) =>
        handleFinishPipeline(err, treatmentFileName, 'Treatment pipeline completed successfully')
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

export { etlRouter };
