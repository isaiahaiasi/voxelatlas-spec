export type FilterConditionally<Source, Condition> = Pick<
	Source,
	{ [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>;

export type TupleIncludes<T extends Readonly<any[]>, U extends any> =
	{ [I in keyof T]: T[I] extends U ? unknown : never }[number] extends
	never ? false : true;
