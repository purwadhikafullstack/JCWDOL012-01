import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const registerValidator = [
  // username status
  body('user_name').notEmpty().withMessage('Username Required'),
  // email status
  body('email').notEmpty().withMessage('Email Required'),
  body('email').isEmail().withMessage('Email Wrong'),
  // password status
  body('password').notEmpty().withMessage('Password Required'),
  body('password').isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    // catch the error if something error from middleware validator
    const errorValidator = validationResult(req);
  },
];

export const proofPaymentValidator = [
  body('file').custom((any, { req }) => {
    if (!req.file) {
      throw new Error('Bukti pembayaran harus diunggah');
    }

    const fileType = req.file.mimetype;

    if (
      !(
        fileType === 'image/jpeg' ||
        fileType === 'image/jpg' ||
        fileType === 'image/png'
      )
    ) {
      throw new Error('File harus berupa gambar (JPG, JPEG, PNG)');
    }

    const maxSize = 1024 * 1024;
    if (req.file.size > maxSize) {
      throw new Error('Ukuran file tidak boleh lebih dari 1MB');
    }

    return true;
  }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
