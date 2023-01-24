import { z } from 'zod';
import { zSchemas } from '.';
import { PaginatedOperationId } from './derivedOperationLists';
import { OperationId } from './operations';
import { requests, responses } from './schemas';
import { PaginationLinks } from './schemas/resources';

const rootPaginatedResponse = z.object({
	data: z.any().array(),
	links: PaginationLinks,
});

// PAGINATION ALIASES
export type RootPaginatedResponse = z.infer<typeof rootPaginatedResponse>;
export type PaginatedResponse<S extends PaginatedOperationId> = z.infer<typeof zSchemas.responses[S]>
export type PaginatedResponseData<S extends PaginatedOperationId> = PaginatedResponse<S>['data'][number];

// REQUEST ALIASES
export type ApiRequest<T extends OperationId> = z.infer<typeof requests[T]>;
export type ApiRequestBody<T extends OperationId> = ApiRequest<T>['body'];
export type ApiRequestParams<T extends OperationId> = ApiRequest<T>['params'];

// RESPONSE ALIASES
export type ApiResponse<T extends OperationId> = z.infer<typeof responses[T]>;
