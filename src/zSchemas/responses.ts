import { z, ZodTypeAny } from 'zod';
import { Comment, Friendship, Like, Room, PaginationLinks, User } from './resources';

function getPaginatedSchema<T extends ZodTypeAny>(zodSchema: T) {
  return z.object({
    data: z.array(zodSchema),
    links: PaginationLinks,
  });
}

function getStandardResponse<T extends ZodTypeAny>(zodSchema: T) {
  return z.object({
    data: zodSchema,
  })
}

export const rootPaginatedResponse = z.object({
  data: z.any().array(),
  links: PaginationLinks,
});

const responses = {
  createComment: getStandardResponse(Comment),
  createFriendship: getStandardResponse(Friendship),
  createLike: getStandardResponse(Like),
  createRoom: getStandardResponse(Room),
  createUser: getStandardResponse(User),

  deleteComment: getStandardResponse(Comment),
  deleteFriendship: getStandardResponse(Friendship),
  deleteLike: getStandardResponse(Like),
  deleteRoom: getStandardResponse(Room),
  deleteUser: getStandardResponse(User),

  getCommentsByRoomId: getPaginatedSchema(Comment),
  getFriends: getStandardResponse(User),
  getFriendships: getPaginatedSchema(Friendship),
  getLikesByRoomId: getPaginatedSchema(Like),
  getLikesByUserId: getPaginatedSchema(Like),
  getLike: getStandardResponse(Like),
  getRoomById: getStandardResponse(Room),
  getRooms: getPaginatedSchema(Room),
  getRoomsByUserId: getPaginatedSchema(Room),
  getUserById: getStandardResponse(User),
  getUsers: getPaginatedSchema(User),

  updateFriendship: getStandardResponse(Friendship),
  updateRoom: getStandardResponse(Room),
  updateUser: getStandardResponse(User),
}

export default responses;