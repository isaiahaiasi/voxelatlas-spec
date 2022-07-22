import { Dto, dtoFields, RootPaginatedResponse } from './dtos';
import { operations } from './operationIds.json';
import apiSpec from './schema.json';
import * as zSchemas from './zSchemas';

type OperationId = keyof typeof operations;
const operationIds = Object.keys(operations) as OperationId[];

export {
  apiSpec,
  zSchemas,
  operations,
  OperationId,
  operationIds,
  Dto,
  RootPaginatedResponse,
  dtoFields,
};
