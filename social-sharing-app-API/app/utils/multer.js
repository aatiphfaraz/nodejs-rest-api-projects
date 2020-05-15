const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/aatif/Documents/NodeJs/social-sharing-app-API/app/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, 'xyz' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const up = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

upload = up.single('userImage');

const uploadImg = {
  upload: upload,
};

module.exports = uploadImg;
