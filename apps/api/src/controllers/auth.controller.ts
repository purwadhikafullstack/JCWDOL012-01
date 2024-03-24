import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { JsonWebTokenError, sign } from 'jsonwebtoken';
import { getEnv } from '@/helpers/environment';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;

      // existing User for email
      const existingUser = await prisma.user.findMany({
        where: {
          email: email,
        },
      });

      // existing user condition
      if (existingUser) {
        throw new Error('Email is already exist');
      }

      // // for gensalt sum password if used hashPassword
      // const salt = await genSalt(10);
      // // for hash password proccess
      // const hashPassword = await hash(req.body.password, salt);

      // sign up account or new User
      const newUser = await prisma.user.create({
        data: {
          email: req.body.email,
          user_name: req.body.user_name,

          // password: hashPassword,
          // role: req.body.role,
        },
      });

      // generate token register
      const registerToken = sign(
        {
          id: newUser.id,
        },
        getEnv(process.env.SECRET_KEY),
      );
      // response register user
      return res.status(200).send({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        token: registerToken,
        message: 'Next create password',
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  // create password
  async createPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // find data user from email
      const { email, password } = req.body;
      const checkingUser = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!checkingUser) {
        throw new Error('email not found');
      }

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      await prisma.user.update({
        where: { email: email },
        data: {
          password: hashPassword,
        },
      });
      return res.send({
        status: true,
        message: 'Create password Success',
      });
    } catch (error) {
      next(error);
    }
  }

  // login User
  async loginUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { email: req.body.email },
      });

      const password: any = user.password;

      // generate token
      const jwtToken = sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
        },
        getEnv(process.env.SECRET_KEY),
      );

      // for compare password from database and request body password
      const isValidPassword = await compare(req.body.password, password);
      // conditional password if variable isvalidpassword false
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      // showing in thunder client, and token must showing in js-cookies
      return res.status(200).send({
        id: user.id,
        user_name: user.user_name,
        email: user.email,
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

  // reset password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // find data user from email
      const dataUser = req.body.dataUser;
      const existingUser = await prisma.user.findFirstOrThrow({
        where: { email: dataUser.email },
      });
      // the password used hashpassword and find email
      const salt = await genSalt(10);
      const hashPassword = await hash(req.body.password, salt);
      await prisma.user.update({
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

  // logout user
  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      // const dataUser = req.body.dataUser;
      // cons
    } catch (error) {}
  }
}
