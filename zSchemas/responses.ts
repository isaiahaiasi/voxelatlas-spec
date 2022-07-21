import { z, ZodTypeAny } from 'zod';
import { Comment, Friendship, Like, Room, PaginationLinks, User } from './resources';

function getPaginatedSchema<T extends ZodTypeAny>(zodSchema: T) {
  return z.object({
    data: z.array(zodSchema),
    links: PaginationLinks,
  });
}

const responses = {
  createComment: Comment,
  createFriendship: Friendship,
  createLike: Like,
  createRoom: Room,
  createUser: User,

  deleteComment: Comment,
  deleteFriendship: Friendship,
  deleteLike: Like,
  deleteRoom: Room,
  deleteUser: User,

  getCommentsByRoomId: getPaginatedSchema(Comment),
  getFriendships: getPaginatedSchema(Friendship),
  getLikesByRoomId: getPaginatedSchema(Like),
  getRoomById: Room,
  getRooms: getPaginatedSchema(Room),
  getRoomsByUserId: getPaginatedSchema(Room),
  getUserById: User,
  getUsers: getPaginatedSchema(User),

  updateFriendship: Friendship,
  updateRoom: Room,
  updateUser: User,
}

export default responses;