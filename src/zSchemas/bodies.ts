import { z } from 'zod';
import { User, Room, Comment, FriendshipRelation } from './resources';

const UserBody = User.pick({ username: true });

const CommentBody = Comment.pick({ content: true });

// TODO: proper implementation of Room RequestBody (ie, the actual data)
const RoomBody = Room.pick({ title: true });

const UpdateFriendshipBody = z.object({
  is: FriendshipRelation,
  status: z.enum(['ACCEPTED', 'REJECTED'])
}).refine(
  // Only the recipient may accept the request
  (data) => data.is === 'recipient' || data.status !== 'ACCEPTED',
);

export {
  UserBody,
  CommentBody,
  RoomBody,
  UpdateFriendshipBody
};
