import * as csv from 'csvtojson';

import { Serializer } from "../serializer";

export class csvSerializer implements Serializer {
  serialize () { return csv()};
};
