import { z, ZodTypeAny } from 'zod';
import {
	Comment, Friendship, Like, Room, PaginationLinks, User, Friend,
} from './resources';

function getPaginatedSchema<T extends ZodTypeAny>(zodSchema: T) {
	return z.object({
		data: z.array(zodSchema),
		links: PaginationLinks,
	});
}

function getStandardResponse<T extends ZodTypeAny>(zodSchema: T) {
	return z.object({
		data: zodSchema,
	});
}

export const createComment = getStandardResponse(Comment);
export const createFriendship = getStandardResponse(Friendship);
export const createLike = getStandardResponse(Like);
export const createRoom = getStandardResponse(Room);
export const createUser = getStandardResponse(User);

export const deleteComment = getStandardResponse(Comment);
export const deleteFriendship = getStandardResponse(Friendship);
export const deleteLike = getStandardResponse(Like);
export const deleteRoom = getStandardResponse(Room);
export const deleteUser = getStandardResponse(User);

export const getCommentsByRoomId = getPaginatedSchema(Comment);
export const getFriends = getPaginatedSchema(Friend);
export const getFriendships = getPaginatedSchema(Friendship);
export const getLikesByRoomId = getPaginatedSchema(Like);
export const getLikesByUserId = getPaginatedSchema(Like);
export const getLike = getStandardResponse(Like);
export const getRoomById = getStandardResponse(Room);
export const getRooms = getPaginatedSchema(Room);
export const getRoomsByUserId = getPaginatedSchema(Room);
export const getUserById = getStandardResponse(User);
export const getUsers = getPaginatedSchema(User);

export const updateFriendship = getStandardResponse(Friendship);
export const updateRoom = getStandardResponse(Room);
export const updateUser = getStandardResponse(User);
