import { z } from 'zod';
import { Cursor, Limit, Id, FriendshipStatus, FriendshipRelation, User, Comment, Room } from './resources';

const queryParams = {
  PaginationQuery: z.object({
    cursor: Cursor.optional(),
    limit: Limit.optional(),
  }),
};

const pathParams = {
  UserId: z.object({
    userid: Id,
  }),
  RoomId: z.object({
    roomid: Id,
  }),
  FriendshipId: z.object({
    friendshipid: Id,
  }),
  CommentId: z.object({
    commentid: Id,
  }),
  LikeId: z.object({
    likeid: Id,
  }),
};

const bodies = {
  User: User.pick({ username: true }),
  Comment: Comment.pick({ content: true }),
  Room: Room.pick({ title: true }),
}

// Associate request validators with operationIds
// TODO?: Auth? Headers?

const defaultRequestObject = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({}),
};


export const createUser = z.object({
  ...defaultRequestObject,
  body: bodies.User,
});

export const createComment = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
  body: bodies.Comment,
});

export const createFriendship = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
});

export const createLike = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
});

export const createRoom = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
  // TODO: proper implementation of Room RequestBody (ie, the actual data)
  body: bodies.Room,
});

export const deleteComment = z.object({
  ...defaultRequestObject,
  params: pathParams.CommentId,
});

export const deleteFriendship = z.object({
  ...defaultRequestObject,
  params: pathParams.FriendshipId,
  query: z.object({
    is: FriendshipRelation,
  }),
});

export const deleteLike = z.object({
  ...defaultRequestObject,
  params: pathParams.LikeId,
});

export const deleteRoom = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
});

export const deleteUser = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
});

export const getCommentsByRoomId = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
  query: queryParams.PaginationQuery,
});

export const getFriends = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
  query: z.object({
    is: FriendshipRelation.optional(),
    status: FriendshipStatus.optional(),
    limit: Limit.optional(),
    cursor: Cursor.optional(),
  }),
});

export const getFriendships = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
  query: z.object({
    is: FriendshipRelation,
    status: FriendshipStatus.optional(),
    limit: Limit.optional(),
    cursor: Cursor.optional(),
  }),
});

export const getLikesByRoomId = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
  query: queryParams.PaginationQuery,
});

export const getLikesByUserId = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
  query: queryParams.PaginationQuery,
});

export const getLike = z.object({
  ...defaultRequestObject,
  params: z.object({
    roomid: Id,
    userid: Id,
  }),
});

export const getRoomById = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
});

export const getRooms = z.object({
  ...defaultRequestObject,
  query: queryParams.PaginationQuery,
});

export const getRoomsByUserId = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
  query: queryParams.PaginationQuery.merge(
    z.object({
      rel: z.enum(['created', 'liked', 'friends']).optional(),
    }),
  ),
});

export const getUserById = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
});

export const getUsers = z.object({
  ...defaultRequestObject,
  query: queryParams.PaginationQuery,
});

export const updateFriendship = z.object({
  ...defaultRequestObject,
  params: pathParams.FriendshipId,
  body: z.object({
    is: FriendshipRelation,
    status: z.enum(['ACCEPTED', 'REJECTED'])
  }).refine(
    // Only the recipient may accept the request
    (data) => data.is === 'recipient' || data.status !== 'ACCEPTED',
  ),
});

export const updateRoom = z.object({
  ...defaultRequestObject,
  params: pathParams.RoomId,
  body: bodies.Room,
});

export const updateUser = z.object({
  ...defaultRequestObject,
  params: pathParams.UserId,
  body: bodies.User,
});
