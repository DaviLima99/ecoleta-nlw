export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(svg)$/)) {
    return callback(new Error('Only svg files are allowed!'), false);
  }
  callback(null, true);
};
