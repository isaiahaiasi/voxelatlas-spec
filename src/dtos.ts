import { z } from 'zod';
import { resources } from './zSchemas';

const { Comment, Friend, Friendship, Like, Room, User } = resources;

const schemaObjects = { Comment, Friend, Friendship, Like, Room, User };

type SchemaObjectName = keyof typeof schemaObjects;

export type Dto = {
  [key in SchemaObjectName]: z.infer<typeof schemaObjects[key]>
};

function getFields<T extends keyof Dto>(name: T) {
  return Object.keys(schemaObjects[name].shape) as (keyof Dto[T])[];
}

// This could map so easily, but I'm not sure how to preserve individual typings.
export const dtoFields = {
  comment: getFields('Comment'),
  friend: getFields('Friend'),
  friendship: getFields('Friendship'),
  like: getFields('Like'),
  room: getFields('Room'),
  user: getFields('User'),
} as const;
