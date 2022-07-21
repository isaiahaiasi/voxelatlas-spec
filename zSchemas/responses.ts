import { z } from 'zod';
import { Comment, Friendship, Like, Room, PaginationLinks, User } from './resources';

export default {
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

  getCommentsByRoomId: z.object({
    data: z.array(Comment),
    links: PaginationLinks,
  }),

  getFriendships: z.object({
    data: z.array(Friendship),
    links: PaginationLinks,
  }),

  getLikesByRoomId: z.object({
    data: z.array(Friendship),
    links: PaginationLinks,
  }),

  getRoomById: Room,

  getRooms: z.object({
    data: z.array(Friendship),
    links: PaginationLinks,
  }),

  getRoomsByUserId: z.object({
    data: z.array(Room),
    links: PaginationLinks,
  }),

  getUserById: User,

  getUsers: z.object({
    data: z.array(Friendship),
    links: PaginationLinks,
  }),

  updateFriendship: Friendship,
  updateRoom: Room,
  updateUser: User,
}
