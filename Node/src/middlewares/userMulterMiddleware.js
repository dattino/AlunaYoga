const path = require('path');
const multer = require('multer');

/* RutaMulter Usuario */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '..', '..', 'public', 'images', 'users', 'profileImages');
    cb(null, folder)
  },

  filename: (req, file, cb) => {
    let imageNewName = 'user-' + Date.now() + path.extname(file.originalname);
    cb(null, imageNewName);
  }
});

function fileFilter(req, file, cb) {
  const validFormat = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  // La función debe llamar a `cb` usando una variable del tipo boolean
  // para indicar si el archivo debería ser aceptado o no
  if (validFormat.includes(file.mimetype)) {
    // Para aceptar el archivo es necesario pasar `true`, de la siguiente forma:
    cb(null, true)
  } else {
    // Para rechazar el archivo es necesario pasar `false`, de la siguiente forma:
    cb(null, false)
  }
}
const uploadFile = multer({ storage, fileFilter: fileFilter });

module.exports = uploadFile;
