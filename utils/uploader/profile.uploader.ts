import multer from "fastify-multer";
import path from "path";
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const { originalname } = file;
    const extname = path.extname(originalname);
    const validExtname = [".jpg", ".png"];
    if (!validExtname.includes(extname)) {
      return cb(new Error("extname is not valid"));
    }
    const filename =
      Date.now() +
      Math.random() * 20000 +
      "_" +
      file.originalname.replace(/\s/g, "-");

    cb(null, filename);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public", "usersProfile"));
  },
});

export default multer({ storage });
