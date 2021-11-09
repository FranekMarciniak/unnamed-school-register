import * as express from 'express';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { Op } from 'sequelize';

import { passport } from '../index';
import { User } from '../models/UserModel';
import {
  clientError,
  conflict,
  fail,
  jsonResponse,
  notFound,
  succses,
} from './BaseController';

const createUser = async (req: express.Request, res: express.Response) => {
  const username = req.body.username;
  const password = validator.isLength(req.body.password, { min: 8, max: 48 })
    ? req.body.password
    : null;
  const email = validator.isEmail(req.body.email) ? req.body.email : null;
  if (username && password && email) {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      if (user) conflict(res, 'User already exists');
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userToSave = User.build({
          username,
          email,
          password: hashedPassword,
        });
        await userToSave.save();
        succses(res, 201, 'User created!');
      }
    } catch (error) {
      fail(res, error as Error);
    }
  } else {
    if (!username && !password && !email) {
      clientError(res, 'Incorrect credentials');
    } else if (!password) {
      clientError(res, 'Password has to be at least 8 characters long');
    } else if (!email) {
      clientError(res, 'Email is incorrect');
    }
  }
};

const loginUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) notFound(res, info);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        succses(res, 200, 'Successfully Authenticated');
      });
    }
  })(req, res, next);
};

const getUser = (req: express.Request, res: express.Response) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    notFound(res, 'User not found');
  }
};

export default { createUser, loginUser, getUser };
