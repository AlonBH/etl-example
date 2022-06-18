import { Router } from 'express';
import * as fs from 'fs';
import { Transform, pipeline } from 'stream';

import { config } from '../../organizationConfig';

const etlRouter = Router();

const getOrganizationConfig = (fileName: string) => {
  return config[getOrganizationName(fileName)];
};

const getOrganizationName = (fileName: string) =>
  fileName.slice(0, fileName.indexOf('_', fileName.indexOf('_') + 1));

const transformStream = (transformer) =>
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
  successMessage: string
) => {
  if (err) {
    console.log(err);
  } else {
    console.log(successMessage);
  }
};

etlRouter.get('', (req, res, next) => {
  // This would come from the current batch
  const patientFileName = 'hospital_1_Patient.csv';
  const patientFileStream = fs.createReadStream(
    `${__dirname}/data/${patientFileName}`
  );
  const patientOutputStream = fs.createWriteStream(
    `${__dirname}/data/patient.ndjson`
  );

  const treatmentFileName = 'hospital_1_Treatment.csv';
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
        handleFinishPipeline(err, 'Patient pipeline completed successfully')
    );

    pipeline(
      treatmentFileStream,
      getOrganizationConfig(treatmentFileName).serializer.serialize(),
      transformStream(
        getOrganizationConfig(treatmentFileName).treatmentTransformer
      ),
      treatmentOutputStream,
      (err: NodeJS.ErrnoException) =>
        handleFinishPipeline(err, 'Treatment pipeline completed successfully')
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export { etlRouter };
