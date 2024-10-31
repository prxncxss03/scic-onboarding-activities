const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  dest: "./public/images",
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/; //acceptable file types
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  },
}).single("image");

module.exports = upload;
