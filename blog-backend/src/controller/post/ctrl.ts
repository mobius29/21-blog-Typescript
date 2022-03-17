import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Post from '../../models/post';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.statusCode = 400;
    res.send();

    return;
  }

  return next();
};

export const write = async (req: Request, res: Response) => {
  const { title, body, tags } = req.body;

  const post = new Post({
    title,
    body,
    tags,
  });

  try {
    await post.save();
    res.send(post);
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export const list = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().exec();
    res.send(posts);
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export const read = (req: Request, res: Response) => {
  res.send();
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    res.statusCode = 204;
    res.send();
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!post) {
      res.statusCode = 204;
      res.send();

      return;
    }

    res.send(post);
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};
