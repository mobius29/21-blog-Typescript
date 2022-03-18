export {};
import { IPost } from './../../types/post';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string | null;
        username: string | null;
      };
      post?: IPost;
    }
  }
}
