const mongoose = require('mongoose');
const Joi = require("joi");
 
// const Genre = mongoose.model('Genre', new mongoose.Schema ({
//     name: {
//       type: String,
//       required: true,
//       minlength: 5,
//       maxlength: 50
//     },
    
//   }));

const genreSchema =new mongoose.Schema ({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60
  },
  
});
const Genre = mongoose.model('Genre', genreSchema); 

  function validateGenre(genre) {
    const schema = {
      title: Joi.string().min(3).required(),
      description: Joi.string().min(5).required(),
    };
    return Joi.validate(genre, schema);
  }

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre; 
  