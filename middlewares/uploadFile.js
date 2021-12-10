const multer = require("multer");

module.exports = (imageFile) => {
  //handling file dan tempat penyimpanan
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace((/\s/g, "")) /*tambah namafile dengan date, replace spasi dengan string kosong*/);
    },
  });

  //handling format gambar
  const fileFilter = (req, file, cb) => {
    if (file.filename === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  //handling max size file
  const sizeInMB = 10;
  const maxSize = sizeInMB * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  return function (req, res, next) {
    upload(req, res, (err) => {
      //handling file kosong
      // if (req.fileValidationError) {
      //   req.session.message = {
      //     type: "danger",
      //     message: "Please select file to upload!",
      //   };
      //   return res.redirect(req.originalUrl);
      // }

      //handling error
      if (err) {
        //limit size
        if (err.code === "LIMIT_FILE_SIZE") {
          req.session.message = {
            type: "danger",
            message: "Error, max size is 10 MB!",
          };
          return res.redirect(req.originalUrl);
        }

        req.session.message = {
          type: danger,
          message: err,
        };
        return res.redirect(req.originalUrl);
      }

      // if okay next to controller
      // in the controller we can access using req.file
      return next();
    });
  };
};
