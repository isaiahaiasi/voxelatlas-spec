import { z } from 'zod';
import { Comment, Friend, Friendship, Like, Room, User } from './resources';

const schemaObjects = {
	Comment, Friend, Friendship, Like, Room, User,
};

type SchemaObjectName = keyof typeof schemaObjects;

export type Resource = {
	[key in SchemaObjectName]: z.infer<typeof schemaObjects[key]>
};

function getFields<T extends keyof Resource>(name: T) {
	return Object.keys(schemaObjects[name].shape) as (keyof Resource[T])[];
}

// This could map so easily, but I'm not sure how to preserve individual typings.
export const resourceFields = {
	comment: getFields('Comment'),
	friend: getFields('Friend'),
	friendship: getFields('Friendship'),
	like: getFields('Like'),
	room: getFields('Room'),
	user: getFields('User'),
} as const;
