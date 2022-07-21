import apiSpec from './schema.json';
import { operations } from './operationIds.json'
import * as zSchemas from './zSchemas';
import { Dto, dtoFields } from './dtos';

type OperationId = keyof typeof operations;
const operationIds = Object.keys(operations) as OperationId[];

export {
  apiSpec,
  zSchemas,
  operations,
  OperationId,
  operationIds,
  Dto,
  dtoFields,
};
