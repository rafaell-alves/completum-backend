import multer from 'multer';
import { Request, Express } from 'express';
import path from 'path';
class RouteStorage {
  private file_path: string;
  constructor(file_path: string) {
    this.file_path = file_path;
  }

  public get_storage_route() {
    return multer.diskStorage({
      destination: (req, res, cb) => {
        const uploadPath = path.resolve(
          __dirname,
          '..',
          'app',
          'upload',
          this.file_path,
        );
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        const fileExt = path.extname(file.originalname);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const newFileName = `${file.fieldname}-${uniqueSuffix}${fileExt}`;
        cb(null, newFileName);
      },
    });
  }

  public get_files(req: Request) {
    if (!req.files) return null;

    return (req.files as Express.Multer.File[]).map(file => file.path);
  }
}

export default RouteStorage;
