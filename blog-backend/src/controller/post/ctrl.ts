import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Post from '../../models/post';
import Joi from 'joi';
import sanitizeHTML from 'sanitize-html';

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

const removeHtmlAndShorten = (body: string) => {
  const filtered = sanitizeHTML(body, { allowedTags: [] });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const getPostById = async (
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

  try {
    const post = await Post.findById(id);
    if (!post) {
      res.status(404);

      return;
    }

    req.post = post;
    return next();
  } catch (e) {
    res.status(500).send(e);
  }
};

export const write = async (req: Request, res: Response) => {
  const writeSchema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    user: req.user,
  });

  const isValidate = writeSchema.validate(req.body);
  if (isValidate.error) {
    res.statusCode = 400;
    res.send(isValidate.error);

    return;
  }

  const { title, body, tags } = req.body;
  const post = new Post({
    title,
    body: sanitizeHTML(body, sanitizeOption),
    tags,
    user: req.user,
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
  const page = parseInt((req.query.page as string) || '1', 10);

  if (page < 1) {
    res.status(400).send('BAD_REQUEST');
    return;
  }

  const { tag, username } = req.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();

    const postCnt = await Post.countDocuments(query).exec();
    res.set('Last-Page', Math.ceil(postCnt / 10).toString());
    res.send(
      posts.map((post) => ({ ...post, body: removeHtmlAndShorten(post.body) })),
    );
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export const read = (req: Request, res: Response) => {
  console.log(req);
  res.send(req.post);
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

  const updateSchema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const isValidate = updateSchema.validate(req.body);
  if (isValidate.error) {
    res.statusCode = 400;
    res.send(isValidate.error);

    return;
  }

  const nextData = { ...req.body };
  if (nextData.body) {
    nextData.body = sanitizeHTML(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
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

export const checkOwnPost = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { user, post } = req;

  if (!user) {
    res.status(401).send('UNAUTHORIZED');
    return;
  }

  if (!post) {
    res.status(400).send('BAD_REQUEST');
    return;
  }

  if (post.user._id.toString() !== user._id) {
    res.status(403).send();
    return;
  }

  return next();
};
