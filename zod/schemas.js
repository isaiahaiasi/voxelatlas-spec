const { z } = require('zod');

// TODO: Add format and precision requirements to Date string validator?
function isDateString(str) {
  return !isNaN(Date.parse(str));
}

const Timestamp = z.string().refine(isDateString);

// Regex for an ObjectId
// see: https://github.com/Automattic/mongoose/issues/1959#issuecomment-97457325
const Id = z.string().regex(
  /^[a-fA-F0-9]{24}$/,
  { message: "ID must be a 24 character hexadecimal string." }
);

const FriendshipStatus = z.enum(['ACCEPTED', 'PENDING', 'REJECTED']);

const Cursor = z.string().max(2048); // Max URL length

const Limit = z.number().min(1).max(100);

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
  url: z.url(),
  creator: User,
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
const Friendship = z.object({
  requester: z.union(User, Id), // These types don't seem to infer as I'd hope by default...
  recipient: z.union(User, Id),
  status: FriendshipStatus,
  ...commonResourceFields,
});

const PaginationLinks = z.object({
  next: z.object({
    href: z.string().url(),
    cursor: Cursor,
  }).optional(),
});

module.exports = {
  Comment,
  Cursor,
  Friendship,
  FriendshipStatus,
  Id,
  Like,
  Limit,
  PaginationLinks,
  Room,
  Timestamp,
  User,
};
