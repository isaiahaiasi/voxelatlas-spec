import { z } from 'zod';
import { Dto, dtoFields } from './dtos';
import { operations } from './operations.json';
import { PaginatedOperationId } from './paginatedOperationId';
import apiSpec from './schema.json';
import * as zSchemas from './zSchemas';

const rootPaginatedResponse = z.object({
  data: z.any().array(),
  links: zSchemas.resources.PaginationLinks,
})

type PaginatedResponseData<S extends PaginatedOperationId> = z.infer<typeof zSchemas.responses[S]>['data'][number];

type RootPaginatedResponse = z.infer<typeof rootPaginatedResponse>;

type OperationId = keyof typeof operations;

const operationIds = Object.keys(operations) as OperationId[];



export {
  apiSpec,
  Dto,
  dtoFields,
  OperationId,
  operationIds,
  operations,
  PaginatedOperationId,
  PaginatedResponseData,
  RootPaginatedResponse,
  zSchemas,
};
