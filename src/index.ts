import { Dto, dtoFields } from './dtos';
import { operations } from './operations.json';
import { OperationId } from './types';
import apiSpec from './schema.json';
import * as zSchemas from './zSchemas';

const operationIds = Object.keys(operations) as OperationId[];

export {
  apiSpec,
  Dto,
  dtoFields,
  OperationId,
  operationIds,
  operations,
  zSchemas,
};
