import { HttpMethod } from './commonTypes';

interface OperationDescription {
	method: HttpMethod
	path: string;
	summary: string;
	description?: string;
}

type Operations = Readonly<Record<string, OperationDescription>>;

export const operations = {
	getUsers: {
		method: 'get',
		path: '/users',
		summary: 'Returns a list of users.',
	},
	createUser: {
		method: 'post',
		path: '/users',
		summary: 'Creates a new user.',
	},
	getRooms: {
		method: 'get',
		path: '/rooms',
		summary: 'Returns a list of "Shoevox" rooms',
	},
	getUserById: {
		method: 'get',
		path: '/users/:userid',
		summary: 'Returns a user by their user id.',
	},
	updateUser: {
		method: 'put',
		path: '/users/:userid',
		summary: 'Updates a user.',
	},
	deleteUser: {
		method: 'delete',
		path: '/users/:userid',
		summary: 'Deletes a user.',

	},
	getRoomsByUserId: {
		method: 'get',
		path: '/users/:userid/rooms',
		summary: 'Gets all the rooms created by a given User.',
	},
	createRoom: {
		method: 'post',
		path: '/users/:userid/rooms',
		summary: 'Posts a new Room under the given User.',
	},
	getFriends: {
		method: 'get',
		path: '/users/:userid/friends',
		summary: 'Returns a list of users. Client ID must match {userid}.',
	},
	getFriendships: {
		method: 'get',
		path: '/users/:userid/friendships',
		summary: 'Returns a list of users. Client ID must match {userid}.',
	},
	createFriendship: {
		method: 'post',
		path: '/users/:userid/friendships',
		summary: 'Sends Friend request.',
		description: 'Creates a Friendship object where the Requester is the CLIENT user and the Recipient is the {userid}. The status is \'PENDING\'.\n',
	},
	getLikesByUserId: {
		method: 'get',
		path: '/users/:userid/likes',
		summary: 'Gets all the likes created by a given User.',
	},
	deleteFriendship: {
		method: 'delete',
		path: '/friendships/:friendshipid',
		summary: 'Deletes a Friendship from a User\'s friends list.',
	},
	updateFriendship: {
		method: 'patch',
		path: '/friendships/:friendshipid',
		summary: 'Accepts or Rejects an existing Friend request.',
		description: 'Patches the `status` property of an existing Friendship object to be either \'ACCEPTED\' or \'REJECTED\'. CLIENT ID must match recipient for \'ACCEPTED\' to be valid. CLIENT ID must match recipient or requester for \'REJECTED\' to be valid.\n',
	},
	getRoomById: {
		method: 'get',
		path: '/rooms/:roomid',
		summary: 'Gets a room by its ID.',
	},
	updateRoom: {
		method: 'patch',
		path: '/rooms/:roomid',
		summary: 'Updates a room by its ID.',
	},
	deleteRoom: {
		method: 'delete',
		path: '/rooms/:roomid',
		summary: 'Deletes a room by its ID.',
	},
	getCommentsByRoomId: {
		method: 'get',
		path: '/rooms/:roomid/comments',
		summary: 'Gets the list of comments for a room.',
	},
	createComment: {
		method: 'post',
		path: '/rooms/:roomid/comments',
		summary: 'Creates comment on room.',
	},
	getLikesByRoomId: {
		method: 'get',
		path: '/rooms/:roomid/likes',
		summary: 'Gets a list of Likes on a Room.',
	},
	createLike: {
		method: 'post',
		path: '/rooms/:roomid/likes',
		summary: 'Adds a Like on a Room.',
	},
	getLike: {
		method: 'get',
		path: '/rooms/:roomid/likes/:userid',
		summary: 'Get a particular Like based on Room + User. Ideally this would',
	},
	deleteComment: {
		method: 'delete',
		path: '/comments/:commentid',
		summary: 'Delete given comment.',
	},
	deleteLike: {
		method: 'delete',
		path: '/likes/:likeid',
		summary: 'Delete given Like.',
	},
} as const satisfies Operations;

export type OperationId = keyof typeof operations;

export const operationIds = Object.keys(operations) as OperationId[];

export const paginatedOperationIds = [
	'getCommentsByRoomId',
	'getFriends',
	'getFriendships',
	'getLikesByRoomId',
	'getLikesByUserId',
	'getRooms',
	'getRoomsByUserId',
	'getUsers',
] as const satisfies Readonly<OperationId[]>;

export type PaginatedOperationId = typeof paginatedOperationIds[number];

export const meta = {
	title: 'Shoevox API',
	description: '**Shoevox** is an open-source social 3D worldbuilding website.',
	version: '0.1.0',
	servers: [{
		url: 'http://localhost:5432/v1',
		description: 'Local development url.',
	}],
};
