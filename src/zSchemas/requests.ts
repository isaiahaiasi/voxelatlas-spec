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

export default {
  createUser: z.object({
    ...defaultRequestObject,
    body: bodies.User,
  }),

  createComment: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
    body: bodies.Comment,
  }),

  createFriendship: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
  }),

  createLike: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
  }),

  createRoom: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
    // TODO: proper implementation of Room RequestBody (ie, the actual data)
    body: bodies.Room,
  }),

  deleteComment: z.object({
    ...defaultRequestObject,
    params: pathParams.CommentId,
  }),

  deleteFriendship: z.object({
    ...defaultRequestObject,
    params: pathParams.FriendshipId,
    query: z.object({
      is: FriendshipRelation,
    }),
  }),

  deleteLike: z.object({
    ...defaultRequestObject,
    params: pathParams.LikeId,
  }),

  deleteRoom: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
  }),

  deleteUser: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
  }),

  getCommentsByRoomId: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
    query: queryParams.PaginationQuery,
  }),

  getFriendships: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
    query: z.object({
      is: FriendshipRelation,
      status: FriendshipStatus.optional(),
      limit: Limit.optional(),
      cursor: Cursor.optional(),
    }),
  }),

  getLikesByRoomId: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
    query: queryParams.PaginationQuery,
  }),

  getLike: z.object({
    ...defaultRequestObject,
    params: z.object({
      roomid: Id,
      userid: Id,
    }),
  }),

  getRoomById: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
  }),

  getRooms: z.object({
    ...defaultRequestObject,
    query: queryParams.PaginationQuery,
  }),

  getRoomsByUserId: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
    query: queryParams.PaginationQuery,
  }),

  getUserById: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
  }),

  getUsers: z.object({
    ...defaultRequestObject,
    query: queryParams.PaginationQuery,
  }),

  updateFriendship: z.object({
    ...defaultRequestObject,
    params: pathParams.FriendshipId,
    body: z.object({
      is: FriendshipRelation,
      status: z.enum(['ACCEPTED', 'REJECTED'])
    }).refine(
      // Only the recipient may accept the request
      (data) => data.is === 'recipient' || data.status !== 'ACCEPTED',
    ),
  }),

  updateRoom: z.object({
    ...defaultRequestObject,
    params: pathParams.RoomId,
    body: bodies.Room,
  }),

  updateUser: z.object({
    ...defaultRequestObject,
    params: pathParams.UserId,
    body: bodies.User,
  }),
}
