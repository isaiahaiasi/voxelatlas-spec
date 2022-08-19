import { z } from 'zod';

// TODO: Add format and precision requirements to Date string validator?
function isDateString(str: string) {
  return !isNaN(Date.parse(str));
}

const Timestamp = z.string().refine(isDateString);

// Regex for an ObjectId
// see: https://github.com/Automattic/mongoose/issues/1959#issuecomment-97457325
const Id = z.string().regex(
  /^[a-fA-F0-9]{24}$/,
  { message: "IDs must be a 24 character hexadecimal string." }
);

const FriendshipStatus = z.enum(['ACCEPTED', 'PENDING', 'REJECTED']);

const FriendshipRelation = z.enum(['recipient', 'requester']);

const Cursor = z.string().max(2048); // Max URL length

// This is a url query param, so it will come in as a string.
// Unfortunately, this seems to mean I can't use number() validators
const Limit = z.string().refine(v => Number(v) > 0 && Number(v) <= 100);

const commonResourceFields = {
  id: Id,
  createdAt: Timestamp,
};

const User = z.object({
  username: z.string().min(3).max(15),
  ...commonResourceFields,
});

const Room = z.object({
  title: z.string().min(3).max(100),
  dataUrl: z.string().url(),
  creator: User,
  likeCount: z.number(),
  commentCount: z.number(),
  ...commonResourceFields,
});

const Comment = z.object({
  content: z.string().min(3).max(140),
  user: User,
  room: Id,
  ...commonResourceFields,
});

const Like = z.object({
  user: User,
  room: Id,
  ...commonResourceFields,
});

// TODO: Decide on whether requester/recipient will be populated or not
// Current server implementation only populates one or the other
// ! NOTE: This Resource is how it is currently stored in MongoDB,
// ! but probably isn't a very useful entity to expose via API.
// ! See "Friend" as more usable public Resource.
const Friendship = z.object({
  requester: z.union([User, Id]), // These types don't seem to infer as I'd hope by default...
  recipient: z.union([User, Id]),
  status: FriendshipStatus,
  ...commonResourceFields,
});

const Friend = z.object({
  initiator: z.boolean(),
  status: FriendshipStatus,
  acceptDate: Timestamp.optional(),
  rejectDate: Timestamp.optional(),
  user: User,
  ...commonResourceFields,
});

const PaginationLinks = z.object({
  next: z.object({
    href: z.string().url(),
    cursor: Cursor,
  }).optional(),
});

export {
  Comment,
  Cursor,
  Friend,
  Friendship,
  FriendshipRelation,
  FriendshipStatus,
  Id,
  Like,
  Limit,
  PaginationLinks,
  Room,
  Timestamp,
  User,
};
