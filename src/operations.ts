import { HttpMethod } from './commonTypes';

export type Tag = 'paginated' | 'protected';

export interface OperationDescription {
	method: HttpMethod
	path: string;
	summary: string;
	description?: string;
	tags?: Readonly<string[]>
}

type GeneralOperations = Record<string, OperationDescription>;

export const operations = {
	getUsers: {
		method: 'get',
		path: '/users',
		summary: 'Returns a list of users.',
		tags: ['paginated'] as const,
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
		tags: ['paginated'] as const,
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
		tags: ['protected'] as const,
	},
	deleteUser: {
		method: 'delete',
		path: '/users/:userid',
		summary: 'Deletes a user.',
		tags: ['protected'] as const,
	},
	getRoomsByUserId: {
		method: 'get',
		path: '/users/:userid/rooms',
		summary: 'Gets all the rooms created by a given User.',
		tags: ['paginated'] as const,
	},
	createRoom: {
		method: 'post',
		path: '/users/:userid/rooms',
		summary: 'Posts a new Room under the given User.',
		tags: ['protected'] as const,
	},
	getFriends: {
		method: 'get',
		path: '/users/:userid/friends',
		summary: 'Returns a list of users. Client ID must match {userid}.',
		tags: ['paginated', 'protected'] as const,
	},
	getFriendships: {
		method: 'get',
		path: '/users/:userid/friendships',
		summary: 'Returns a list of users. Client ID must match {userid}.',
		tags: ['paginated', 'protected'] as const,
	},
	createFriendship: {
		method: 'post',
		path: '/users/:userid/friendships',
		summary: 'Sends Friend request.',
		description: 'Creates a Friendship object where the Requester is the CLIENT user and the Recipient is the {userid}. The status is \'PENDING\'.\n',
		tags: ['protected'] as const,
	},
	getLikesByUserId: {
		method: 'get',
		path: '/users/:userid/likes',
		summary: 'Gets all the likes created by a given User.',
		tags: ['paginated'] as const,
	},
	deleteFriendship: {
		method: 'delete',
		path: '/friendships/:friendshipid',
		summary: 'Deletes a Friendship from a User\'s friends list.',
		tags: ['protected'] as const,
	},
	updateFriendship: {
		method: 'patch',
		path: '/friendships/:friendshipid',
		summary: 'Accepts or Rejects an existing Friend request.',
		description: 'Patches the `status` property of an existing Friendship object to be either \'ACCEPTED\' or \'REJECTED\'. CLIENT ID must match recipient for \'ACCEPTED\' to be valid. CLIENT ID must match recipient or requester for \'REJECTED\' to be valid.\n',
		tags: ['protected'] as const,
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
		tags: ['protected'] as const,
	},
	deleteRoom: {
		method: 'delete',
		path: '/rooms/:roomid',
		summary: 'Deletes a room by its ID.',
		tags: ['protected'] as const,
	},
	getCommentsByRoomId: {
		method: 'get',
		path: '/rooms/:roomid/comments',
		summary: 'Gets the list of comments for a room.',
		tags: ['paginated'] as const,
	},
	createComment: {
		method: 'post',
		path: '/rooms/:roomid/comments',
		summary: 'Creates comment on room.',
		tags: ['protected'] as const,
	},
	getLikesByRoomId: {
		method: 'get',
		path: '/rooms/:roomid/likes',
		summary: 'Gets a list of Likes on a Room.',
		tags: ['paginated'] as const,
	},
	createLike: {
		method: 'post',
		path: '/rooms/:roomid/likes',
		summary: 'Adds a Like on a Room.',
		tags: ['protected'] as const,
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
		tags: ['protected'] as const,
	},
	deleteLike: {
		method: 'delete',
		path: '/likes/:likeid',
		summary: 'Delete given Like.',
		tags: ['protected'] as const,
	},
} satisfies GeneralOperations;

export type Operations = typeof operations;

export type OperationId = keyof Operations;

export const operationIds = Object.keys(operations) as OperationId[];

export const meta = {
	title: 'Shoevox API',
	description: '**Shoevox** is an open-source social 3D worldbuilding website.',
	version: '0.1.0',
	servers: [{
		url: 'http://localhost:5432/v1',
		description: 'Local development url.',
	}],
};
