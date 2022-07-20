const { User, Room, Comment } = require('./schemas');

const UserBody = User.pick({ username: true });

const CommentBody = Comment.pick({ content: true });

// TODO: proper implementation of Room RequestBody (ie, the actual data)
const RoomBody = Room.pick({ title: true });

module.exports = {
  UserBody,
  CommentBody,
  RoomBody,
};
