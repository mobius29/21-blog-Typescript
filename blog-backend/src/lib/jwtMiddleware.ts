import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from './../models/user';

const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return next();

  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET as string);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded_any = decoded as any;

    req.user = {
      _id: decoded_any._id || null,
      username: decoded_any.username || null,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded_any.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded_any._id);
      const token = user?.generateToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
