import multer from "multer";

export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Formato de arquivo inválido. Permitido: .jpg, .jpeg, .png"),
      );
    }
  },
};
