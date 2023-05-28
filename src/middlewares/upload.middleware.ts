import multer, { FileFilterCallback } from "multer";
import moment from "moment";
import { Express, Request } from "express";

const formatDate = () => moment().format("DDMMYYYY-HHmmss_SSS");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const date = formatDate();
    cb(null, `${date}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadFiles = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
