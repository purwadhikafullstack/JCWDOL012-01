import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { genSalt, hash } from 'bcrypt';

export class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const user_name = req.body.user_name;

      // existing User for email
      const existingUser = await prisma.users.findUnique({
        where: { email: req.body.email },
      });
      // existing user condition
      if (existingUser) {
        throw new Error('Email is already exist');
      }
      // for gensalt sum password if used hashPassword
      const salt = await genSalt(10);
      // for hash password proccess
      const hashPassword = await hash(req.body.password, salt);

      // sign up account or new User
      const newUser = await prisma.users.create({
        data: {
          user_name: req.body.user_name,
          email: req.body.email,
          password: hashPassword,
          role: req.body.role,
        },
      });
      // response register user
      return res.status(201).send({ success: true, result: newUser });
    } catch (error: any) {
      next(error);
    }
  }
}
