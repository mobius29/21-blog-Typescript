import { Request, Response, NextFunction } from 'express';

const checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).send('UNAUTHORIZED');
    return;
  }

  return next();
};

export default checkLoggedIn;
