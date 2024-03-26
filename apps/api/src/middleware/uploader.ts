import { Request } from 'express';
import multer from 'multer';
import { join } from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = join(__dirname, '../../public');

  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      const destination = folderName ? defaultDir + folderName : defaultDir;
      console.log('Folder Tujuan:', destination); // Menambahkan console.log untuk mencetak folder tujuan
      cb(null, destination);
    },
    filename(req: Request, file: Express.Multer.File, cb: FilenameCallback) {
      const originalNameParts = file.originalname.split('.');
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFilename = filePrefix + Date.now() + '.' + fileExtension;
      console.log('Nama Asli File:', file.originalname); // Menambahkan console.log untuk mencetak nama file asli
      console.log('Nama Baru File:', newFilename); // Menambahkan console.log untuk mencetak nama file baru
      cb(null, newFilename);
    },
  });

  return multer({ storage });
};
