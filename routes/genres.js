
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/user');

const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')


router.get(
  "/", auth,
  async (req, res) => { 
  const genres = await Genre.find().sort("name");
  res.send(genres);
  });  

// handle storage using multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
var upload = multer({ storage: storage });
// handle single file upload

router.post('/upload', (req, res) => {
  console.log(req.file);
  upload(req, res , err => {
      if (err) {
          console.log(err);
          return res.send('somthing went wrong');
      }
      return res.send('file uploaded successfully');
  });
})

router.post("/",auth, async (req, res) => {
 

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    title: req.body.title ,
    description: req.body.description
  });
  genre = await genre.save();
  res.send(genre);

}
);

router.delete("/:id", auth, async (req, res) => {
   const genre = await Genre.findByIdAndRemove(req.params.id);
   if (!genre) return res.status(404).send("The genre with the given ID was not found");
   res.send(genre);
  });

module.exports = router;

