import { z } from "zod";
import { operations, zSchemas } from ".";
import { PaginatedOperationId } from "./paginatedOperationId";
import { requests, responses } from "./zSchemas";
import { rootPaginatedResponse } from "./zSchemas/responses";

// GENERAL OPERATION TYPES
export type OperationId = keyof typeof operations;
export type ReadonlyOperationId = `get${any}` & OperationId;
export type MutableOperationId = Exclude<OperationId, ReadonlyOperationId>;

// PAGINATION ALIASES
export type RootPaginatedResponse = z.infer<typeof rootPaginatedResponse>;
export type PaginatedResponse<S extends PaginatedOperationId> = z.infer<typeof zSchemas.responses[S]>
export type PaginatedResponseData<S extends PaginatedOperationId> = PaginatedResponse<S>['data'][number];

// REQUEST ALIASES
export type ApiRequest<T extends OperationId> = z.infer<typeof requests[T]>;
export type ApiRequestBody<T extends OperationId> = ApiRequest<T>['body'];

// RESPONSE ALIASES
export type ApiResponse<T extends OperationId> = z.infer<typeof responses[T]>;