import mongoose from 'mongoose';

interface IPost {
  title: string;
  body: string;
  tags: [string];
  publishedDate: Date;
  user: {
    _id: mongoose.Types.ObjectId;
    username: string;
  };
}

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
    required: true,
  },
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
