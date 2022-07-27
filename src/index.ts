import { z } from 'zod';
import { Dto, dtoFields } from './dtos';
import { operations } from './operations.json';
import { PaginatedOperationId } from './paginatedOperationId';
import apiSpec from './schema.json';
import * as zSchemas from './zSchemas';

type OperationId = keyof typeof operations;

const operationIds = Object.keys(operations) as OperationId[];

const rootPaginatedResponse = z.object({
  data: z.any().array(),
  links: zSchemas.resources.PaginationLinks,
})

type RootPaginatedResponse = z.infer<typeof rootPaginatedResponse>;

type PaginatedResponse<S extends PaginatedOperationId> = z.infer<typeof zSchemas.responses[S]>
type PaginatedResponseData<S extends PaginatedOperationId> = PaginatedResponse<S>['data'][number];

export {
  apiSpec,
  Dto,
  dtoFields,
  OperationId,
  operationIds,
  operations,
  PaginatedOperationId,
  PaginatedResponseData,
  PaginatedResponse,
  RootPaginatedResponse,
  zSchemas,
};
