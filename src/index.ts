import { Dto, dtoFields } from './dtos';
import { operations } from './operations.json';
import { OperationId } from './types';
import apiSpec from './schema.json';
import * as zSchemas from './zSchemas';
import * as types from './types';

const operationIds = Object.keys(operations) as OperationId[];

export {
  apiSpec,
  Dto,
  dtoFields,
  OperationId,
  operationIds,
  operations,
  zSchemas,
  types,
};
