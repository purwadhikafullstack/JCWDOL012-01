import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;
      const user_name = req.body.user_name;

      // existing User for email
      const existingUser = await prisma.users.findUnique({
        where: {
          email: email,
        },
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
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  // login User
  async loginUser(req: Request, res: Response) {
    try {
      const users = await prisma.users.findUniqueOrThrow({
        where: { email: req.body.email },
      });

      const password: any = users.password;

      // generate token
      const jwtToken = sign(
        {
          id: users.id,
          role: users.role,
          email: users.email,
        },
        'Secret123',
      );

      // for compare password from database and request body password
      const isValidPassword = await compare(req.body.password, password);
      // conditional password if variable isvalidpassword false
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      // showing in thunder client, and token must showing in js-cookies
      return res.status(200).send({
        id: users.id,
        user_name: users.user_name,
        email: users.email,
        token: jwtToken,
      });
    } catch (error: any) {
      // response status error
      return res.status(500).send({
        status: false,
        message: error.message,
      });
    }
  }
  // logout user
  async logoutUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // const dataUser = req.body.dataUser;
      // cons
    } catch (error) {}
  }

  // reset password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // find data user from email
      const dataUser = req.body.dataUser;
      const existingUser = await prisma.users.findFirstOrThrow({
        where: { email: dataUser.email },
      });
      // the password used hashpassword and find email
      const salt = await genSalt(10);
      const hashPassword = await hash(req.body.password, salt);
      await prisma.users.update({
        where: { email: existingUser.email },
        data: { password: hashPassword },
      });
      // response status success
      return res.send({
        status: true,
        message: 'success',
      });
      // response status error
    } catch (error) {
      next(error);
    }
  }
}
