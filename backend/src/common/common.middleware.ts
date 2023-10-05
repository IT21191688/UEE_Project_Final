import multer from "multer";

const multerUploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

export default { multerUploader };
