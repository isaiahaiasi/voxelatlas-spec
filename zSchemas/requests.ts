import { z } from 'zod';
import { UserBody, RoomBody, CommentBody, UpdateFriendshipBody } from './bodies';
import { Cursor, Limit, Id, FriendshipStatus, FriendshipRelation } from './resources';

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

// Associate request validators with operationIds
// TODO?: Auth? Headers?

export default {
  createUser: z.object({
    body: UserBody,
  }),

  createComment: z.object({
    params: pathParams.RoomId,
    body: CommentBody,
  }),

  createFriendship: z.object({
    params: pathParams.UserId,
  }),

  createLike: z.object({
    params: pathParams.RoomId,
  }),

  createRoom: z.object({
    params: pathParams.UserId,
    body: RoomBody,
  }),

  deleteComment: z.object({
    params: pathParams.CommentId,
  }),

  deleteFriendship: z.object({
    params: pathParams.FriendshipId,
    query: z.object({
      is: FriendshipRelation,
    }),
  }),

  deleteLike: z.object({
    params: pathParams.LikeId,
  }),

  deleteRoom: z.object({
    params: pathParams.RoomId,
  }),

  deleteUser: z.object({
    params: pathParams.UserId,
  }),

  getCommentsByRoomId: z.object({
    params: pathParams.RoomId,
    query: queryParams.PaginationQuery,
  }),

  getFriendships: z.object({
    params: pathParams.UserId,
    query: z.object({
      is: FriendshipRelation,
      status: FriendshipStatus.optional(),
      limit: Limit.optional(),
      cursor: Cursor.optional(),
    }),
  }),

  getLikesByRoomId: z.object({
    params: pathParams.RoomId,
    query: queryParams.PaginationQuery,
  }),

  getRoomById: z.object({
    params: pathParams.RoomId,
  }),

  getRooms: z.object({
    query: queryParams.PaginationQuery,
  }),

  getRoomsByUserId: z.object({
    params: pathParams.UserId,
    query: queryParams.PaginationQuery,
  }),

  getUserById: z.object({
    params: pathParams.UserId,
  }),

  getUsers: z.object({
    query: queryParams.PaginationQuery,
  }),

  updateFriendship: z.object({
    params: pathParams.FriendshipId,
    body: UpdateFriendshipBody,
  }),

  updateRoom: z.object({
    params: pathParams.RoomId,
    body: RoomBody,
  }),

  updateUser: z.object({
    params: pathParams.UserId,
    body: UserBody,
  }),
}
