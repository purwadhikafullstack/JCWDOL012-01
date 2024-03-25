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
      const existingUser = await prisma.user.findUnique({
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
      const newUser = await prisma.user.create({
        data: {
          user_name: req.body.user_name,
          email: req.body.email,
          password: hashPassword,
          role: 'Customer',
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
      const users = await prisma.user.findUniqueOrThrow({
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
        process.env.JWT_SECRET as string,
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
        role: users.role,
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
    } catch (error) { }
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

  async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_name, email, password, role } = req.body;
      const existingUser = await prisma.user.findMany({ where: { OR: [{ email }, { user_name }] } });

      if (existingUser?.length != 0) return res.status(400).json({ success: false, message: 'Email or username already exist' });

      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const newAdmin = await prisma.user.create({
        data: {
          user_name,
          email,
          password: hashedPassword,
          role
        }
      });

      return res.status(201).json({ success: true, results: newAdmin });
    } catch (error) {
      return next(error);
    }
  }

  async getUserFromToken(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.dataUser.id },
        include: {
          stores: true,
          carts: true,
          orders: true,
          user_Adresses: true,
          Voucher: true,
        }
      });
      return res.status(200).json({ success: true, results: user });
    } catch (error) {
      next(error);
    }
  }
}
