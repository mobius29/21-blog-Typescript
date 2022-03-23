import { IUser } from './user';

export interface IPost {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  publishedDate: Date;
  user: IUser;
}
