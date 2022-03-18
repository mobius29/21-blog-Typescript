import { Request, Response } from 'express';
import Joi from 'joi';
import User from './../../models/user';

export const register = async (req: Request, res: Response) => {
  const registerSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const isValid = registerSchema.validate(req.body);
  if (isValid.error) {
    res.statusCode = 400;
    res.send(isValid.error);

    return;
  }

  const { username, password } = req.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      res.statusCode = 409;
      res.send();
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save();

    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    res.send(user.serialize());
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.statusCode = 401;
    res.send();

    return;
  }

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      res.statusCode = 401;
      res.send('UNAUTHORIZED');

      return;
    }

    const isValid = await user.checkPassword(password);
    if (!isValid) {
      res.statusCode = 401;
      res.send('UNAUTHORIZED');

      return;
    }

    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    res.send(user.serialize());
  } catch (e) {
    res.statusCode = 500;
    res.send(e);
  }
};

export const check = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) {
    res.status(401).send();

    return;
  }

  res.send(user);
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('access_token');
  res.status(204).send();
};
