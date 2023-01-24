import { operations, Operations, OperationDescription, Tag, OperationId } from './operations';
import { FilterConditionally, TupleIncludes } from './typeHelpers';

export type ReadonlyOperationId = `get${string}` & OperationId;
export type MutableOperationId = Exclude<OperationId, ReadonlyOperationId>;

type Tagged = { tags: Readonly<string[]> };

type AllTaggedOps = FilterConditionally<Operations, Tagged>;

type TaggedOperations<T extends Tag> = Pick<
	AllTaggedOps,
	{ [K in keyof AllTaggedOps]: TupleIncludes<AllTaggedOps[K]['tags'], T> extends true
		? K
		: never
	}[keyof AllTaggedOps]>;

function getOperationIdsByTag<T extends Tag>(tag: T) {
	return Object
		.entries(operations)
		.filter(([_, v]) => (v as OperationDescription).tags?.includes(tag))
		// I don't know how to convince TypeScript this is a valid inferrence
		.map(([k]) => k) as unknown as keyof TaggedOperations<T>;
}

export type PaginatedOperationId = keyof TaggedOperations<'paginated'>;
export type ProtectedOperationId = keyof TaggedOperations<'protected'>;

export const paginatedOperations = getOperationIdsByTag('paginated');
export const protectedOperations = getOperationIdsByTag('protected');

