'use strict';
const multer = require('multer');
const path = require('path');

function checkFileType(file, cb) {
  const types = /image\/(jpeg|png|gif)/; 
  const mimetype = types.test(file.mimetype.toLowerCase());
  if (mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); 
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}-${Math.random().toString(36).substring(7)}${extname}`;
    if (!req.uploadedFileNames) req.uploadedFileNames = {};
    if (!req.uploadedFileNames[file.fieldname]) req.uploadedFileNames[file.fieldname] = [];
    req.uploadedFileNames[file.fieldname].push(filename);
    cb(null, filename);
  },
});

const multerInstance = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

const uploadMiddleware = (req, res, next) => {
  multerInstance.fields([
    { name: 'images', maxCount: 10 }, 
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = uploadMiddleware;
